import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils';

// ============================================
// Input Props
// ============================================

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

// ============================================
// Input Component
// ============================================

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      fullWidth = true,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;
    const hasError = !!error;

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-brand-900"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">
              {leftIcon}
            </span>
          )}
          
          <input
            ref={ref}
            type={type}
            id={inputId}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            className={cn(
              // Base styles
              'w-full rounded-lg border bg-white px-4 py-2.5',
              'text-brand-900 placeholder:text-surface-400',
              'transition-all duration-200',
              // Focus styles
              'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent',
              // Border styles
              hasError
                ? 'border-red-500 focus:ring-red-500'
                : 'border-surface-200 hover:border-surface-300',
              // Icon padding
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              // Disabled styles
              disabled && 'bg-surface-50 cursor-not-allowed opacity-60',
              className
            )}
            {...props}
          />
          
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400">
              {rightIcon}
            </span>
          )}
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            className="text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
        
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-sm text-surface-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
