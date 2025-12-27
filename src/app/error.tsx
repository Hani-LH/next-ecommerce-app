'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="text-8xl mb-6">⚠️</div>
      <h1 className="text-4xl font-bold text-brand-900 mb-4">
        Something went wrong
      </h1>
      <p className="text-surface-600 mb-8 max-w-md">
        We encountered an unexpected error. Please try again or contact support
        if the problem persists.
      </p>
      <Button size="lg" onClick={reset}>
        Try Again
      </Button>
    </div>
  );
}
