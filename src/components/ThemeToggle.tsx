import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#004AAD] dark:focus:ring-[#973cff]"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-6 h-6 overflow-hidden">
        {/* Sun Icon */}
        <Sun 
          className={`absolute inset-0 w-6 h-6 text-yellow-500 transition-all duration-500 transform ${
            theme === 'light' 
              ? 'translate-y-0 rotate-0 opacity-100' 
              : '-translate-y-8 rotate-180 opacity-0'
          }`}
        />
        
        {/* Moon Icon */}
        <Moon 
          className={`absolute inset-0 w-6 h-6 text-blue-400 transition-all duration-500 transform ${
            theme === 'dark' 
              ? 'translate-y-0 rotate-0 opacity-100' 
              : 'translate-y-8 rotate-180 opacity-0'
          }`}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;