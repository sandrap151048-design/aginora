"use client";
import React, { useRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "children"> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'blue' | 'black';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className,
  ...props 
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variants = {
    primary: 'bg-primary-green text-white shadow-[0_10px_30px_-10px_rgba(11,190,110,0.4)] hover:shadow-[0_20px_40px_-10px_rgba(11,190,110,0.5)]',
    blue: 'bg-primary-blue text-white shadow-[0_10px_30px_-10px_rgba(10,102,194,0.4)] hover:shadow-[0_20px_40px_-10px_rgba(10,102,194,0.5)]',
    secondary: 'bg-secondary-green text-primary-green hover:bg-primary-green hover:text-white',
    outline: 'border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white',
    ghost: 'bg-transparent text-dark hover:bg-slate-100',
    black: 'bg-dark text-white shadow-2xl hover:bg-slate-800',
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-8 py-4 text-base font-bold',
    lg: 'px-10 py-5 text-lg font-black',
    xl: 'px-14 py-8 text-2xl font-black tracking-tight',
  };

  return (
    <motion.button 
      ref={btnRef}
      type={props.type || 'button'}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        'rounded-2xl transition-all duration-300 font-bold active:scale-95 flex items-center justify-center gap-3 relative overflow-hidden group',
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 rounded-full blur-2xl" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default Button;
