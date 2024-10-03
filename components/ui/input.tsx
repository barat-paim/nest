import React from 'react';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={`w-full px-4 py-4 bg-[#2c2e31] text-[#d1d0c5] border-2 border-[#4a4b4e] rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent placeholder-[#646669] text-lg transition-all ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';