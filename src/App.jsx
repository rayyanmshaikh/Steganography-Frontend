import { useSteganography } from "./hooks/useSteganography";
import Layout from "./components/Layout";
import FileUpload from "./components/FileUpload";
import TextInput from "./components/TextInput";
import StatusMessages from "./components/StatusMessages";

/**
 * Main steganography application component
 * Provides a interface for encoding/decoding text into images using LSB steganography
 */
export default function SteganographyFrontend() {
  const {
    previewUrl,
    capacity,
    text,
    status,
    loading,
    decodedText,
    error,
    
    // Refs
    fileInputRef,
    
    // Actions
    setText,
    handleFileSelect,
    encodeText,
    decodeText,
  } = useSteganography();

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Select Image
            </h2>
            <FileUpload
              onFileSelect={handleFileSelect}
              fileInputRef={fileInputRef}
              previewUrl={previewUrl}
              capacity={capacity}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Message Operations
            </h2>
            <TextInput
              text={text}
              setText={setText}
              capacity={capacity}
              onEncode={encodeText}
              onDecode={decodeText}
              loading={loading}
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <StatusMessages 
          status={status}
          error={error}
          decodedText={decodedText}
        />
      </div>

    </Layout>
  );
}
