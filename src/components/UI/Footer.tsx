import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">MazeBot: Escape Protocol</h3>
          </div>

          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6">
            <div className="text-sm text-gray-400">
              <span>Using: OSS</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-700 text-center text-xs text-gray-500">
          <p>© 2025 MazeBot. Developed with 🤖 by Raj.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
