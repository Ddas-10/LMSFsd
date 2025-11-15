// src/components/ui/Alert.jsx
import React from 'react';
import { AlertCircle } from 'lucide-react';

export const Alert = ({ children, variant = 'info' }) => {
  const variants = {
    info: 'bg-blue-50/60 border-blue-100 text-blue-600',
    success: 'bg-green-50/60 border-green-100 text-green-600',
    warning: 'bg-amber-50/60 border-amber-100 text-amber-600',
    danger: 'bg-rose-50/60 border-rose-100 text-rose-600'
  };

  return (
    <div className={`border px-4 py-3 rounded-xl flex items-center gap-2 backdrop-blur-sm shadow-sm ${variants[variant]}`}>
      <AlertCircle size={18} />
      {children}
    </div>
  );
};