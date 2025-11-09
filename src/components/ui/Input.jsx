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
      <label className="block text-sm font-semibold text-neutral-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
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
          border-2 
          ${error ? 'border-red-300 focus:border-red-500' : 'border-neutral-200 focus:border-blue-500'}
          rounded-xl 
          bg-white
          text-neutral-900
          placeholder:text-neutral-400
          focus:outline-none 
          focus:ring-4 
          ${error ? 'focus:ring-red-100' : 'focus:ring-blue-100'}
          transition-all
          duration-200
        `}
      />
    </div>
    {error && (
      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
        <AlertCircle size={14} />
        {error}
      </p>
    )}
    {helperText && !error && (
      <p className="mt-2 text-sm text-neutral-500">{helperText}</p>
    )}
  </div>
);