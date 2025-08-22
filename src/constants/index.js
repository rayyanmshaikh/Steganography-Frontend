/**
 * Application constants and configuration
 */

export const API_ENDPOINTS = {
  ENCODE: "/api/encodeTI",
  DECODE: "/api/decodeTI",
};

export const FILE_NAMES = {
  ENCODED_IMAGE: "encoded.png",
};

export const MESSAGES = {
  NO_IMAGE_SELECTED: "No image selected",
  NO_TEXT_TO_ENCODE: "No text to encode",
  INVALID_IMAGE_FILE: "Please select an image file",
  TEXT_TOO_LONG: "Text too long. Max {capacity} characters for this image.",
  ENCODING: "Encoding...",
  DECODING: "Decoding...",
  ENCODE_SUCCESS: "Encoded image downloaded as encoded.png",
  DECODE_SUCCESS: "Decoded successfully",
  NO_HIDDEN_TEXT: "No hidden text found",
  ENCODE_FAILED: "Encode failed: {error}",
  DECODE_FAILED: "Decode failed: {error}",
  IMAGE_LOAD_FAILED: "Failed to read image: {error}",
};

export const CAPACITY_FORMULA = {
  // Formula: ((width * height * 3) / 8) - 12
  CHANNELS: 3, // RGB
  BITS_PER_BYTE: 8,
  HEADER_OVERHEAD: 12,
};
