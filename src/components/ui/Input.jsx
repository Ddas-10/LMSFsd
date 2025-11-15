import React from 'react';
import { AlertCircle } from 'lucide-react';

export const Input = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  required, 
  placeholder, 
  className = '',
  error = '',
  helperText = '',
  icon: Icon
}) => (
  <div className={`mb-5 ${className}`}>
    {label && (
      <label className="block text-sm font-semibold text-neutral-600 mb-2">
        {label} {required && <span className="text-rose-400">*</span>}
      </label>
    )}
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-300">
          <Icon size={20} />
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`
          w-full 
          ${Icon ? 'pl-11' : 'pl-4'} 
          pr-4 py-3 
          border 
          ${error ? 'border-rose-300 focus:border-rose-400' : 'border-neutral-100 focus:border-blue-400'}
          rounded-xl 
          bg-white/80 backdrop-blur-sm
          text-neutral-700
          placeholder:text-neutral-300
          focus:outline-none 
          focus:ring-4 
          ${error ? 'focus:ring-rose-50' : 'focus:ring-blue-50'}
          transition-all
          duration-200
          shadow-sm
        `}
      />
    </div>
    {error && (
      <p className="mt-2 text-sm text-rose-500 flex items-center gap-1">
        <AlertCircle size={14} />
        {error}
      </p>
    )}
    {helperText && !error && (
      <p className="mt-2 text-sm text-neutral-400">{helperText}</p>
    )}
  </div>
);