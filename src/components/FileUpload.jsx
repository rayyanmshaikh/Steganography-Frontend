/**
 * File upload component with drag and drop support
 */
export default function FileUpload({ onFileSelect, fileInputRef, previewUrl, capacity }) {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-3 w-full text-sm"
      />

      <div className="text-xs text-gray-500 mb-4">
        Or drag & drop an image here
      </div>

      {previewUrl && (
        <div className="mt-4">
          <img 
            src={previewUrl} 
            alt="Selected image" 
            className="max-w-full h-auto max-h-48 border rounded-lg" 
          />
          <div className="text-xs mt-2 text-gray-500">
            {capacity !== null ? (
              <>
                Capacity: <span className="font-medium">{capacity.toLocaleString()}</span> characters
              </>
            ) : (
              <span className="italic">Computing capacity...</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
