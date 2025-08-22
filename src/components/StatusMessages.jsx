/**
 * Status messages component for displaying feedback to the user
 */
export default function StatusMessages({ status, error, decodedText }) {
  if (!status && !error && decodedText === null) {
    return null;
  }

  return (
    <div className="space-y-3">
      {status && (
        <div className="p-3 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg text-sm">
          {status}
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {decodedText !== null && (
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="text-sm text-gray-600 mb-2">
            Decoded message:
          </div>
          <div className="bg-white p-3 rounded border text-gray-900 text-sm">
            <pre className="whitespace-pre-wrap font-mono">
              {decodedText || <span className="text-gray-400 italic">No hidden text found</span>}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
