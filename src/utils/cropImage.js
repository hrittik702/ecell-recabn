/**
 * Utility to crop and compress client-side images.
 * Uses sensible 512x512 dimensions for crisp retina avatar rendering
 * while keeping binary file size under 35-45KB.
 */

/**
 * Produces a compressed binary JPEG Blob from cropped image coordinates.
 *
 * @param {string} imageSrc - Source data URI or object URL of the selected image
 * @param {Object} pixelCrop - Bounding box { x, y, width, height }
 * @param {number} targetSize - Canvas pixel dimension (default 512 for retina avatars)
 * @param {number} quality - JPEG compression quality (default 0.80)
 * @returns {Promise<Blob>}
 */
export const getCroppedBlob = async (imageSrc, pixelCrop, targetSize = 512, quality = 0.80) => {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });

  const canvas = document.createElement('canvas');
  canvas.width = targetSize;
  canvas.height = targetSize;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get 2D canvas rendering context');

  // Enable high quality bicubic downscaling
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    targetSize,
    targetSize
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Canvas to Blob conversion failed'));
          return;
        }
        resolve(blob);
      },
      'image/jpeg',
      quality
    );
  });
};

/**
 * Backward compatibility helper that returns a Data URL.
 */
export const getCroppedImg = async (imageSrc, pixelCrop, targetSize = 512, quality = 0.80) => {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });

  const canvas = document.createElement('canvas');
  canvas.width = targetSize;
  canvas.height = targetSize;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get 2D canvas rendering context');

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    targetSize,
    targetSize
  );

  return canvas.toDataURL('image/jpeg', quality);
};
