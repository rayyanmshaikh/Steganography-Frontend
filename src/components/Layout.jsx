/**
 * Main layout component for the application
 */
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-2xl font-medium text-gray-900 mb-2">
            Steganography
          </h1>
          <p className="text-gray-500 text-sm">
            Hide messages in images
          </p>
        </header>
        {children}
      </div>
    </div>
  );
}
