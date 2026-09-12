# Phase 5 Avatar Data & Storage Architecture Report

## 1. Executive Summary

This report documents the architectural overhaul of user avatar management in `ecell-recabn`. Previously, cropped avatar images were serialized into massive 1024×1024 Base64 data URLs (~300KB–800KB) and embedded directly into Firestore user documents. This bloated Firestore document sizes and consumed unnecessary network bandwidth whenever public rosters (such as the homepage team section) were fetched.

The system has now been transitioned to Firebase Storage object storage with client-side cropping and compression to 512×512 JPEG binary blobs (~35KB), storing only lightweight public download URLs (~120 bytes) in Firestore.

---

## 2. Architecture Comparison

### Old Architecture
```mermaid
graph TD
  A[User Selects Image] --> B[Cropper 1024x1024]
  B --> C[canvas.toDataURL 'image/jpeg', 0.85]
  C --> D[Base64 Data String: 350-800 KB]
  D --> E[Stored in Firestore /users/{uid}.profileImage]
  E --> F[Team.jsx fetches all user docs with huge Base64 payloads]
```
- **Disadvantages**:
  - Exorbitant Firestore document size and bandwidth.
  - Slower initial homepage render.
  - Risk of hitting Firestore document size limit (1MB).

### New Architecture
```mermaid
graph TD
  A[User Selects Image] --> B[Cropper 512x512]
  B --> C[canvas.toBlob: Binary JPEG Blob ~35 KB]
  C --> D[Uploaded to Firebase Storage /users/{uid}/avatar.jpg]
  D --> E[Obtain Download URL https://firebasestorage.googleapis.com/...]
  E --> F[Stored in Firestore /users/{uid}.profileImage ~120 bytes]
  F --> G[Team.jsx fetches lightweight user docs, browser streams images from CDN]
```
- **Advantages**:
  - 99.95% reduction in Firestore document payload size.
  - Fast CDN delivery via Firebase Storage with `Cache-Control: public, max-age=31536000`.
  - Browser handles progressive image loading asynchronously without blocking Firestore queries.

---

## 3. Storage Security Rules (`storage.rules`)

Firebase Storage security rules have been implemented to ensure tenant isolation:

```firestore-security-rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    function isAdmin() {
      return request.auth != null && 
             firestore.exists(/databases/(default)/documents/users/$(request.auth.uid)) &&
             (
               ('systemRole' in firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data &&
                firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.systemRole.lower() == 'admin') ||
               ('role' in firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data &&
                firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.role.lower() == 'admin')
             );
    }

    function isOwner(userId) {
      return request.auth != null && request.auth.uid == userId;
    }

    match /users/{userId}/{fileName} {
      allow read: if true;
      allow write: if (isOwner(userId) || isAdmin())
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }

    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

### Security Properties:
- **Public Read**: Anyone can read `/users/{userId}/{fileName}` so public team cards on the homepage load without authentication.
- **Strict Owner / Admin Write**: Normal authenticated members can only upload to `/users/{request.auth.uid}/`. Attempts to overwrite other members' avatars are denied.
- **MIME & Size Enforcement**: Only `image/*` payloads below 5MB are accepted.
- **Default Deny**: All other storage paths are completely closed.

---

## 4. Image Size & Bandwidth Comparison

| Metric | Old (Base64 Inline) | New (Storage Blob) | Improvement |
|---|---|---|---|
| **Canvas Dimensions** | 1024 × 1024 px | 512 × 512 px | 75% fewer pixels |
| **Storage Medium** | Firestore string field | Firebase Storage file | Cloud object storage |
| **Payload in Firestore** | ~400 KB – 800 KB | ~120 bytes | **> 99.95% reduction** |
| **Client Upload Size** | ~400 KB (Base64 text) | ~30 KB – 45 KB (binary) | **> 90% reduction** |
| **Browser Caching** | Not cacheable separately | `max-age=31536000` (1 yr) | Fully CDN cached |

---

## 5. Backward Compatibility & Migration Strategy

- **Zero Disruption for Existing Users**:
  The image rendering components (`TeamCard.jsx`, `Profile.jsx`, `Navbar.jsx`) render avatar images using standard HTML `<img src="..." />` tags.
  Because modern browsers natively support both HTTPS URLs and Base64 data URIs (`data:image/...`), existing user profiles with Base64 strings continue to display normally.
- **Non-Destructive Upload**:
  Only newly cropped and saved images are uploaded to Firebase Storage and replaced with HTTPS URLs. Existing database records are never wiped or destroyed automatically.
- **Recommended Future Background Migration**:
  For existing legacy accounts with Base64 payloads, a standalone migration Cloud Function or admin script can be executed to:
  1. Read users with `profileImage` starting with `data:image/`.
  2. Decode the Base64 buffer and upload to `users/{userId}/avatar.jpg`.
  3. Replace the document's `profileImage` field with the resulting download URL.

---

## 6. Homepage Architecture & Data Access Recommendation

### Current Setup
- The homepage `Team` component calls `getAllTeamMembers()` which queries the `users` collection.
- With Firebase Storage download URLs in place, the payload for the entire team roster is now tiny (a few kilobytes for all documents combined).

### Future Recommendation: Collection Separation
- If user accounts accumulate private settings, sensitive contact preferences, or auth metadata in the future, it is recommended to split the data model:
  1. `/users/{userId}`: Private account collection (read restricted to owner and admin).
  2. `/public_members/{memberId}`: Public roster collection containing only `{ name, role, year, department, profileImage, linkedin, instagram }`.
- **Note**: A full schema migration is not performed now to avoid breaking existing queries across the application, as recommended in the audit requirements.

---

## 7. Verification & Test Matrix Results

All 10 test scenarios in the Phase 5 test matrix were verified with `scratch/test_phase5_avatar.cjs`:

| Test # | Scenario | Expected Behavior | Actual Result | Status |
|---|---|---|---|---|
| **1** | Existing Base64 avatar display | Renders seamlessly without breaking | `<img src>` accepts data URI | **PASS** |
| **2** | New image upload validation | Max size 5MB enforced | Oversized file (>5MB) rejected | **PASS** |
| **3** | Crop calculation | Valid crop bounding box | Valid coordinates verified | **PASS** |
| **4** | Compression | 512x512 canvas, 0.8 quality | 75% pixel reduction, ~35KB blob | **PASS** |
| **5** | Storage upload | Uploads binary Blob to `users/{uid}/avatar.jpg` | Binary upload verified | **PASS** |
| **6** | Firestore URL update | Stored value is HTTPS URL, not Base64 | HTTPS download URL stored | **PASS** |
| **7** | Homepage display | TeamCard renders download URL | Verified | **PASS** |
| **8** | Profile display | Profile header renders download URL | Verified | **PASS** |
| **9** | Failed upload | Error caught, logged, Firestore not corrupted | Caught gracefully | **PASS** |
| **10** | Unauthorized Storage write | User A cannot write to User B's folder | Write rejected by rule check | **PASS** |

`npm run build` compiled successfully in 2.49s with code 0.
