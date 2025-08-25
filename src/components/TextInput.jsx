/**
 * Text input component for encoding messages
 */
export default function TextInput({ 
  text, 
  setText, 
  capacity, 
  onEncode, 
  onDecode, 
  loading 
}) {
  const isTextTooLong = capacity !== null && text.length > capacity;

  return (
    <div className="space-y-4">
      <div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className={`w-full p-3 border rounded-lg resize-vertical text-sm ${
            isTextTooLong ? 'border-red-300' : 'border-gray-200'
          } focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400`}
          placeholder="Enter message to hide in image..."
        />
      </div>

      <div className="flex justify-between items-center text-xs text-gray-500">
        <div className={isTextTooLong ? 'text-red-500' : ''}>
          {text.length.toLocaleString()} characters
        </div>
        <div>
          {capacity !== null ? `Max: ${capacity.toLocaleString()}` : "No image"}
        </div>
      </div>

      {isTextTooLong && (
        <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
          Exceeds capacity by {(text.length - capacity).toLocaleString()} characters
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={onEncode}
          disabled={loading || !text.trim() || isTextTooLong}
          className="flex-1 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 
                   disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Working..." : "Encode"}
        </button>

        <button
          onClick={onDecode}
          disabled={loading}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 
                   disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Working..." : "Decode"}
        </button>
      </div>
    </div>
  );
}
