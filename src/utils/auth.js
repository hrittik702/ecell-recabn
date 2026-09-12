/**
 * Authoritative client-side helper to determine if a user has administrator privileges.
 *
 * System authorization model:
 * - Canonical: `systemRole === 'admin'` determines administrative privileges.
 * - Backward compatibility: Legacy records where `role === 'admin'` are recognized.
 * - Organizational/display titles such as "Faculty Lead", "President", "Corporate Head",
 *   or "Operational Head" do NOT grant administrative access unless `systemRole === 'admin'`.
 *
 * @param {Object|null|undefined} userData - The user document object from Firestore
 * @returns {boolean} True if the user has administrative authorization, false otherwise
 */
export const isAdmin = (userData) => {
  if (!userData || typeof userData !== 'object') {
    return false;
  }

  const systemRole = (userData.systemRole || '').toString().trim().toLowerCase();
  if (systemRole === 'admin') {
    return true;
  }

  const role = (userData.role || '').toString().trim().toLowerCase();
  if (role === 'admin') {
    return true;
  }

  return false;
};
