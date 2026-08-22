export const getCroppedImg = async (imageSrc, pixelCrop) => {
  const image = new Image();
  image.src = imageSrc;
  
  await new Promise((resolve) => {
    image.onload = resolve;
  });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  // Increase output size to 1024x1024 for high resolution!
  const targetSize = 1024;
  canvas.width = targetSize;
  canvas.height = targetSize;

  // Draw the cropped image onto the canvas, scaling it down to 1024x1024
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

  // Return as a high-quality Base64 Data URL (JPEG, 92% quality)
  let base64 = canvas.toDataURL('image/jpeg', 0.92);
  
  // Safety check: Firestore has a hard limit of 1MB (1,048,576 bytes) per document.
  // Base64 encoding inflates size by 33%. If the resulting string is larger than ~900KB,
  // we slightly reduce the quality so the database doesn't reject it.
  if (base64.length > 900000) {
    base64 = canvas.toDataURL('image/jpeg', 0.85);
  }
  if (base64.length > 950000) {
    base64 = canvas.toDataURL('image/jpeg', 0.75);
  }

  return base64;
};
