// src/components/ui/Alert.jsx
import React from 'react';
import { AlertCircle } from 'lucide-react';

export const Alert = ({ children, variant = 'info' }) => {
  const variants = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    danger: 'bg-red-50 border-red-200 text-red-800'
  };

  return (
    <div className={`border px-4 py-3 rounded-lg flex items-center gap-2 ${variants[variant]}`}>
      <AlertCircle size={18} />
      {children}
    </div>
  );
};