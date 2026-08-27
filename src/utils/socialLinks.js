/**
 * Normalizes user-entered social media usernames or full URLs to proper https URLs.
 */

export const normalizeLinkedInUrl = (input) => {
  if (!input || typeof input !== 'string') return null;
  const trimmed = input.trim();
  if (!trimmed || trimmed === '#' || trimmed === '/') return null;

  // Full URL
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  // Stored as domain without protocol (e.g. linkedin.com/in/...)
  if (/^(www\.)?linkedin\.com/i.test(trimmed)) {
    return `https://${trimmed}`;
  }

  // Stored as clean username (e.g. "hrittik-maurya" or "@hrittik-maurya" or "in/hrittik-maurya")
  const cleanUsername = trimmed.replace(/^[@/]+/, '').replace(/^in\//i, '');
  if (!cleanUsername) return null;
  return `https://www.linkedin.com/in/${cleanUsername}`;
};

export const normalizeInstagramUrl = (input) => {
  if (!input || typeof input !== 'string') return null;
  const trimmed = input.trim();
  if (!trimmed || trimmed === '#' || trimmed === '/') return null;

  // Full URL
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  // Stored as domain without protocol (e.g. instagram.com/...)
  if (/^(www\.)?instagram\.com/i.test(trimmed)) {
    return `https://${trimmed}`;
  }

  // Stored as clean username (e.g. "hrittik_india" or "@hrittik_india")
  const cleanUsername = trimmed.replace(/^[@/]+/, '');
  if (!cleanUsername) return null;
  return `https://www.instagram.com/${cleanUsername}/`;
};

export const normalizeWebsiteUrl = (input) => {
  if (!input || typeof input !== 'string') return null;
  const trimmed = input.trim();
  if (!trimmed || trimmed === '#' || trimmed === '/') return null;

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
};
