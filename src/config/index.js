/**
 * Application configuration
 * Reads from environment variables with fallback defaults
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "",
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
  RETRY_ATTEMPTS: parseInt(import.meta.env.VITE_API_RETRY_ATTEMPTS) || 3,
};

// API Endpoints
export const API_ENDPOINTS = {
  TIENCODE: "/api/text-in-image/encodeTI",
  TIDECODE: "/api/text-in-image/decodeTI",
};

// File Configuration
export const FILE_CONFIG = {
  ENCODED_IMAGE_NAME: "encoded.png",
  ACCEPTED_IMAGE_TYPES: "image/*",
  MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
};

// UI Configuration
export const UI_CONFIG = {
  MAX_TEXTAREA_ROWS: 8,
  PREVIEW_IMAGE_MAX_HEIGHT: 192, // 48 * 4 (12rem in pixels)
};

// Messages
export const MESSAGES = {
  NO_IMAGE_SELECTED: "No image selected",
  NO_TEXT_TO_ENCODE: "No text to encode",
  INVALID_IMAGE_FILE: "Please select an image file",
  TEXT_TOO_LONG: "Text too long. Max {capacity} characters for this image.",
  ENCODING: "Encoding...",
  DECODING: "Decoding...",
  ENCODE_SUCCESS: "Encoded image downloaded successfully",
  DECODE_SUCCESS: "Decoded successfully",
  NO_HIDDEN_TEXT: "No hidden text found",
  ENCODE_FAILED: "Encode failed: {error}",
  DECODE_FAILED: "Decode failed: {error}",
  IMAGE_LOAD_FAILED: "Failed to read image: {error}",
  CONNECTION_ERROR:
    "Unable to connect to server. Please check your connection.",
  TIMEOUT_ERROR: "Request timed out. Please try again.",
};

// Capacity calculation formula
export const CAPACITY_FORMULA = {
  CHANNELS: 3, // RGB
  BITS_PER_BYTE: 8,
  HEADER_OVERHEAD: 12,
};

// Development helpers
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;

/**
 * Get the full API URL for an endpoint
 */
export function getApiUrl(endpoint) {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
}

/**
 * Log configuration in development
 */
if (isDevelopment) {
  console.log("API Configuration:", {
    baseUrl: API_CONFIG.BASE_URL || "(same origin)",
    timeout: API_CONFIG.TIMEOUT,
    retryAttempts: API_CONFIG.RETRY_ATTEMPTS,
  });
}
