import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils';

// ============================================
// Button Variants
// ============================================

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-brand-900 text-white 
    hover:bg-brand-800 
    focus-visible:ring-brand-500
    disabled:bg-brand-300
  `,
  secondary: `
    bg-surface-100 text-brand-900 
    hover:bg-surface-200 
    focus-visible:ring-surface-400
    disabled:bg-surface-50 disabled:text-surface-400
  `,
  outline: `
    border-2 border-brand-900 text-brand-900 bg-transparent
    hover:bg-brand-900 hover:text-white
    focus-visible:ring-brand-500
    disabled:border-surface-300 disabled:text-surface-400 disabled:hover:bg-transparent
  `,
  ghost: `
    text-brand-900 bg-transparent
    hover:bg-surface-100
    focus-visible:ring-surface-400
    disabled:text-surface-400 disabled:hover:bg-transparent
  `,
  danger: `
    bg-red-600 text-white
    hover:bg-red-700
    focus-visible:ring-red-500
    disabled:bg-red-300
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2.5',
  icon: 'h-10 w-10 p-0',
};

// ============================================
// Button Props
// ============================================

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

// ============================================
// Button Component
// ============================================

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center',
          'font-medium rounded-lg',
          'transition-all duration-200 ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:pointer-events-none',
          'active:scale-[0.98]',
          // Variant & size
          variantStyles[variant],
          sizeStyles[size],
          // Full width
          fullWidth && 'w-full',
          // Loading state
          loading && 'relative text-transparent',
          className
        )}
        {...props}
      >
        {children}
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinner size={size === 'sm' ? 'sm' : 'md'} />
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

// ============================================
// Loading Spinner
// ============================================

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <svg
      className={cn('animate-spin', sizeClasses[size], className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
