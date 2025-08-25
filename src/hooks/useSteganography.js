import { useState, useRef, useEffect } from "react";
import steganographyApi from "../services/steganographyApi";
import { MESSAGES, FILE_CONFIG } from "../config/index.js";
import {
  calculateImageCapacity,
  isValidImageFile,
  downloadBlob,
  createPreviewUrl,
  revokePreviewUrl,
} from "../utils/imageUtils";

/**
 * Custom hook for managing steganography operations
 */
export function useSteganography() {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [capacity, setCapacity] = useState(null);
  const [text, setText] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [decodedText, setDecodedText] = useState(null);
  const [error, setError] = useState(null);
  const [serverBase, setServerBase] = useState("");

  const fileInputRef = useRef(null);

  // Cleanup preview URL on unmount or when it changes
  useEffect(() => {
    return () => {
      if (previewUrl) {
        revokePreviewUrl(previewUrl);
      }
    };
  }, [previewUrl]);

  // Update API base URL when serverBase changes
  useEffect(() => {
    steganographyApi.setBaseUrl(serverBase);
  }, [serverBase]);

  const clearMessages = () => {
    setError(null);
    setStatus(null);
    setDecodedText(null);
  };

  const handleFileSelect = async (file) => {
    clearMessages();

    if (!isValidImageFile(file)) {
      setError(MESSAGES.INVALID_IMAGE_FILE);
      return;
    }

    setImageFile(file);

    // Clean up previous preview URL
    if (previewUrl) {
      revokePreviewUrl(previewUrl);
    }

    const url = createPreviewUrl(file);
    setPreviewUrl(url);

    try {
      const newCapacity = await calculateImageCapacity(url);
      setCapacity(newCapacity);
    } catch (err) {
      setError(MESSAGES.IMAGE_LOAD_FAILED.replace("{error}", err.message));
    }
  };

  const encodeText = async () => {
    clearMessages();

    if (!imageFile) {
      setError(MESSAGES.NO_IMAGE_SELECTED);
      return;
    }

    if (!text.trim()) {
      setError(MESSAGES.NO_TEXT_TO_ENCODE);
      return;
    }

    if (capacity !== null && text.length > capacity) {
      setError(MESSAGES.TEXT_TOO_LONG.replace("{capacity}", capacity));
      return;
    }

    setLoading(true);
    setStatus(MESSAGES.ENCODING);

    try {
      const blob = await steganographyApi.encodeText(imageFile, text);
      downloadBlob(blob, FILE_CONFIG.ENCODED_IMAGE_NAME);
      setStatus(MESSAGES.ENCODE_SUCCESS);
    } catch (err) {
      setError(MESSAGES.ENCODE_FAILED.replace("{error}", err.message));
      setStatus(null);
    } finally {
      setLoading(false);
    }
  };

  const decodeText = async () => {
    clearMessages();

    if (!imageFile) {
      setError(MESSAGES.NO_IMAGE_SELECTED);
      return;
    }

    setLoading(true);
    setStatus(MESSAGES.DECODING);

    try {
      const result = await steganographyApi.decodeText(imageFile);

      if (result.found) {
        setDecodedText(result.text);
        setStatus(MESSAGES.DECODE_SUCCESS);
      } else {
        setDecodedText(null);
        setStatus(MESSAGES.NO_HIDDEN_TEXT);
      }
    } catch (err) {
      setError(MESSAGES.DECODE_FAILED.replace("{error}", err.message));
      setStatus(null);
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setImageFile(null);
    if (previewUrl) {
      revokePreviewUrl(previewUrl);
    }
    setPreviewUrl(null);
    setCapacity(null);
    setText("");
    clearMessages();
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return {
    // State
    imageFile,
    previewUrl,
    capacity,
    text,
    status,
    loading,
    decodedText,
    error,
    serverBase,

    // Refs
    fileInputRef,

    // Actions
    setText,
    setServerBase,
    handleFileSelect,
    encodeText,
    decodeText,
    clearAll,
  };
}
