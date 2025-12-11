import React from 'react';

const TextArea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  rows = 4,
  maxLength,
  className = '',
}) => {
  const characterCount = value?.length || 0;

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-slate-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        maxLength={maxLength}
        className={`
          w-full px-4 py-2.5
          border rounded-lg
          text-slate-900 placeholder-slate-400
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-auc-blue-500 focus:border-transparent
          disabled:bg-slate-100 disabled:cursor-not-allowed
          resize-none
          ${error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-slate-300 hover:border-slate-400'
          }
        `}
      />
      <div className="flex justify-between items-center">
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
        {maxLength && (
          <p className={`text-sm ml-auto ${
            characterCount > maxLength * 0.9 ? 'text-orange-500' : 'text-slate-400'
          }`}>
            {characterCount}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextArea;
