import { CAPACITY_FORMULA, FILE_NAMES } from "../constants/index.js";

/**
 * Utility functions for image processing and file handling
 */

/**
 * Calculate the text capacity of an image based on its dimensions
 * Formula: ((width * height * 3) / 8) - 12
 */
export function calculateImageCapacity(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      const pixels = width * height;
      const maxChars =
        Math.floor(
          (pixels * CAPACITY_FORMULA.CHANNELS) / CAPACITY_FORMULA.BITS_PER_BYTE
        ) - CAPACITY_FORMULA.HEADER_OVERHEAD;
      resolve(maxChars);
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageUrl;
  });
}

/**
 * Validate if a file is an image
 */
export function isValidImageFile(file) {
  return file && file.type.startsWith("image/");
}

/**
 * Download a blob as a file
 */
export function downloadBlob(blob, filename = FILE_NAMES.ENCODED_IMAGE) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

/**
 * Create a preview URL for a file
 */
export function createPreviewUrl(file) {
  return URL.createObjectURL(file);
}

/**
 * Revoke a preview URL
 */
export function revokePreviewUrl(url) {
  if (url) {
    URL.revokeObjectURL(url);
  }
}
