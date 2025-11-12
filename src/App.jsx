// src/App.jsx
import React, { useEffect, useState } from 'react';
import { AuthProvider } from './context/AuthContext';
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-neutral-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;