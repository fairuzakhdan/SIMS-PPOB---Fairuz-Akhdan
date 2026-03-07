import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export default function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  const baseClass = 'w-full py-2.5 px-4 rounded-lg text-base font-semibold transition-colors';
  const variantClass = variant === 'primary' 
    ? 'bg-red-600 hover:bg-red-700 text-white' 
    : 'bg-gray-500 hover:bg-gray-600 text-white';

  return (
    <button
      {...props}
      className={`${baseClass} ${variantClass} ${className}`}
    >
      {children}
    </button>
  );
}
