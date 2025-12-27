import { HTMLAttributes } from 'react';
import { cn } from '@/utils';

// ============================================
// Badge Variants
// ============================================

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-surface-100 text-surface-700',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-amber-100 text-amber-800',
  danger: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
};

// ============================================
// Badge Props
// ============================================

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

// ============================================
// Badge Component
// ============================================

export function Badge({
  className,
  variant = 'default',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5',
        'text-xs font-medium rounded-full',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
