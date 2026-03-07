import UploadSection from "./components/UploadSection";
import ChatSection from "./components/ChatSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Research Assistant</h1>
          <p className="text-gray-500 mt-2">Upload a PDF and ask questions about it</p>
        </div>

        {/* Upload + Chat */}
        <UploadSection />
      </div>
    </main>
  );
}