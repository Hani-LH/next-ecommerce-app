import { forwardRef, SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils';

// ============================================
// Select Props
// ============================================

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
}

// ============================================
// Select Component
// ============================================

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      options,
      placeholder,
      fullWidth = true,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).slice(2, 9)}`;
    const hasError = !!error;

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-brand-900"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${selectId}-error` : undefined}
            className={cn(
              // Base styles
              'w-full appearance-none rounded-lg border bg-white px-4 py-2.5 pr-10',
              'text-brand-900',
              'transition-all duration-200',
              'cursor-pointer',
              // Focus styles
              'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent',
              // Border styles
              hasError
                ? 'border-red-500 focus:ring-red-500'
                : 'border-surface-200 hover:border-surface-300',
              // Disabled styles
              disabled && 'bg-surface-50 cursor-not-allowed opacity-60',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map(option => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400 pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {error && (
          <p
            id={`${selectId}-error`}
            className="text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
