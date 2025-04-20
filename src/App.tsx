import GameContainer from "./components/Game/GameContainer";
import Header from "./components/UI/Header";
import Footer from "./components/UI/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-8">
          <GameContainer />
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            About Alibaba Cloud Usage
          </h2>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold mb-2 text-blue-700">
              Object Storage Service (OSS)
            </h3>
            <p className="text-gray-600">
              MazeBot uses Alibaba Cloud OSS to store and retrieve maze level
              data, robot sprites, and game assets. This ensures high
              availability and performance for players worldwide.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
