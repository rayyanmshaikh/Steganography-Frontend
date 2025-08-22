import { API_ENDPOINTS } from "../constants/index.js";

/**
 * API service for steganography operations
 */

class SteganographyApi {
  constructor(baseUrl = "") {
    this.baseUrl = baseUrl;
  }

  setBaseUrl(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async encodeText(imageFile, text) {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("text", text);

    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.ENCODE}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        errorText || `Server responded with status ${response.status}`
      );
    }

    return response.blob();
  }

  async decodeText(imageFile) {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.DECODE}`, {
      method: "POST",
      body: formData,
    });

    const text = await response.text();

    if (!response.ok) {
      if (response.status === 204) {
        return { found: false, text: null, message: "No hidden text found" };
      }
      throw new Error(
        text || `Server responded with status ${response.status}`
      );
    }

    return { found: true, text: text || "", message: "Decoded successfully" };
  }
}

export default new SteganographyApi();
