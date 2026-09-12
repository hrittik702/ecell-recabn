import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

/**
 * Uploads a user's cropped avatar image blob to Firebase Storage
 * and retrieves the public download URL.
 *
 * Stored at: users/{userId}/avatar.jpg
 *
 * @param {string} userId - User's authentication UID
 * @param {Blob} imageBlob - Binary image blob (JPEG)
 * @returns {Promise<string>} Public download URL for the avatar
 */
export const uploadUserAvatar = async (userId, imageBlob) => {
  if (!userId) {
    throw new Error('User ID is required to upload avatar');
  }
  if (!imageBlob) {
    throw new Error('Image blob is required to upload avatar');
  }

  const storageRef = ref(storage, `users/${userId}/avatar.jpg`);
  const metadata = {
    contentType: 'image/jpeg',
    cacheControl: 'public, max-age=31536000'
  };

  await uploadBytes(storageRef, imageBlob, metadata);
  const downloadUrl = await getDownloadURL(storageRef);
  return downloadUrl;
};
