// src/App.jsx
import React, { useEffect, useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AppContent from './components/AppContent';
import { initializeStorage } from './utils/initStorage';

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initialize storage when app loads
    initializeStorage();
    setIsReady(true);
  }, []);

  // Optional: Show loading screen while initializing
  if (!isReady) {
    return (
      <div className="min-h-screen bg-light-primary dark:bg-dark-primary flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-dark-accent-primary mx-auto mb-4"></div>
          <p className="text-light-text-secondary dark:text-dark-text-secondary font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;