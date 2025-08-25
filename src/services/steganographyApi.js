import {
  API_CONFIG,
  API_ENDPOINTS,
  getApiUrl,
  MESSAGES,
} from "../config/index.js";

/**
 * API service for steganography operations
 * Handles communication with the backend server
 */

class SteganographyApi {
  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
    this.retryAttempts = API_CONFIG.RETRY_ATTEMPTS;
  }

  /**
   * Set a custom base URL (overrides environment config)
   */
  setBaseUrl(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * Create a fetch request with timeout and error handling
   */
  async fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === "AbortError") {
        throw new Error(MESSAGES.TIMEOUT_ERROR);
      }
      throw new Error(MESSAGES.CONNECTION_ERROR);
    }
  }

  /**
   * Retry a request with exponential backoff
   */
  async retryRequest(requestFn, attempts = this.retryAttempts) {
    for (let i = 0; i < attempts; i++) {
      try {
        return await requestFn();
      } catch (error) {
        if (i === attempts - 1) throw error;

        // Exponential backoff: 1s, 2s, 4s, etc.
        const delay = Math.pow(2, i) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  async encodeText(imageFile, text) {
    const requestFn = async () => {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("text", text);

      const url = this.baseUrl
        ? `${this.baseUrl}${API_ENDPOINTS.ENCODE}`
        : getApiUrl(API_ENDPOINTS.ENCODE);

      const response = await this.fetchWithTimeout(url, {
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
    };

    return this.retryRequest(requestFn);
  }

  async decodeText(imageFile) {
    const requestFn = async () => {
      const formData = new FormData();
      formData.append("image", imageFile);

      const url = this.baseUrl
        ? `${this.baseUrl}${API_ENDPOINTS.DECODE}`
        : getApiUrl(API_ENDPOINTS.DECODE);

      const response = await this.fetchWithTimeout(url, {
        method: "POST",
        body: formData,
      });

      const text = await response.text();

      if (!response.ok) {
        if (response.status === 204) {
          return { found: false, text: null, message: MESSAGES.NO_HIDDEN_TEXT };
        }
        throw new Error(
          text || `Server responded with status ${response.status}`
        );
      }

      return {
        found: true,
        text: text || "",
        message: MESSAGES.DECODE_SUCCESS,
      };
    };

    return this.retryRequest(requestFn);
  }
}

export default new SteganographyApi();
