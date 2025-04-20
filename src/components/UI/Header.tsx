import React from 'react';
import { Bot, Cloud } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-lg">
            <Bot size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">MazeBot</h1>
            <p className="text-xs text-blue-200">Escape Protocol</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 bg-blue-700 bg-opacity-50 px-3 py-1 rounded-full text-sm">
          <Cloud size={16} className="text-blue-200" />
          {/* <span className="text-blue-100">Powered by </span> */}
        </div>
      </div>
    </header>
  );
};

export default Header;