import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  icon,
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-auc-blue-600 text-white hover:bg-auc-blue-700 focus:ring-auc-blue-500 disabled:bg-slate-300',
    secondary: 'bg-white text-auc-blue-600 border-2 border-auc-blue-600 hover:bg-auc-blue-50 focus:ring-auc-blue-500 disabled:border-slate-300 disabled:text-slate-300',
    gold: 'bg-auc-gold-500 text-white hover:bg-auc-gold-400 focus:ring-auc-gold-500 disabled:bg-slate-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-slate-300',
    ghost: 'text-slate-600 hover:bg-slate-100 focus:ring-slate-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'cursor-not-allowed opacity-60' : ''} ${className}`;

  const content = (
    <>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </>
  );

  if (to && !disabled) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {content}
    </button>
  );
};

export default Button;
