import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({ 
  children, 
  variant = 'default', 
  size = 'md', 
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#e2b714] focus:ring-offset-2 focus:ring-offset-[#323437]'
  
  const variants = {
    default: 'bg-[#e2b714] text-[#323437] hover:bg-[#e2b714]/90',
    secondary: 'bg-[#4a4b4e] text-[#d1d0c5] hover:bg-[#4a4b4e]/90',
    ghost: 'bg-transparent text-[#d1d0c5] hover:bg-[#4a4b4e]/50',
  }

  const sizes = {
    sm: 'text-sm px-3 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  }

  const variantStyles = variants[variant] || variants.default
  const sizeStyles = sizes[size] || sizes.md

  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}