/**
 * Utility functions to load an image, apply rotation and crop to HTML5 canvas,
 * and return the result as a Blob or File.
 */

export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

export function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

/**
 * Crops an image based on react-easy-crop's pixel coordinates and rotation.
 * Returns { file, blob, dataUrl }.
 *
 * @param {string} imageSrc - Image source URL (blob: or data:)
 * @param {{ x: number, y: number, width: number, height: number }} pixelCrop - Crop pixel coordinates
 * @param {number} rotation - Rotation in degrees (0, 90, 180, 270)
 * @param {string} fileName - Destination file name
 * @param {string} mimeType - Output MIME type ('image/jpeg', 'image/png', 'image/webp')
 * @param {number} quality - Image quality (0.0 to 1.0)
 */
export async function getCroppedImg(
  imageSrc,
  pixelCrop,
  rotation = 0,
  fileName = 'cropped-avatar.jpg',
  mimeType = 'image/jpeg',
  quality = 0.92
) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas context unavailable');
  }

  const rotRad = getRadianAngle(rotation);

  // Calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  // Set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // Translate canvas center to image center before rotating
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.translate(-image.width / 2, -image.height / 2);

  // Draw rotated image onto intermediate canvas
  ctx.drawImage(image, 0, 0);

  // Create cropped canvas with exact pixelCrop dimensions
  const cropCanvas = document.createElement('canvas');
  cropCanvas.width = Math.max(1, Math.round(pixelCrop.width));
  cropCanvas.height = Math.max(1, Math.round(pixelCrop.height));

  const cropCtx = cropCanvas.getContext('2d');
  if (!cropCtx) {
    throw new Error('Cropped canvas context unavailable');
  }

  // Draw the cropped region from the rotated canvas onto the crop canvas
  cropCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    cropCanvas.width,
    cropCanvas.height
  );

  // Return as Blob, File, and DataUrl
  return new Promise((resolve, reject) => {
    cropCanvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to create cropped image blob'));
          return;
        }

        const safeFileName = fileName.endsWith('.jpg') || fileName.endsWith('.png') || fileName.endsWith('.webp')
          ? fileName
          : `${fileName}.jpg`;

        const file = new File([blob], safeFileName, {
          type: blob.type || mimeType,
          lastModified: Date.now(),
        });

        const dataUrl = cropCanvas.toDataURL(mimeType, quality);

        resolve({
          file,
          blob,
          dataUrl,
        });
      },
      mimeType,
      quality
    );
  });
}
