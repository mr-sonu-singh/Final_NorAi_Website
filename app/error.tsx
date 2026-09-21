'use client';

import { useEffect } from 'react';
import { Container } from '@/components/foundation/Container';
import { ErrorState } from '@/components/molecules/ErrorState';
import { Button } from '@/components/atoms/Button';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Root error boundary caught error:', error);
  }, [error]);

  return (
    <Container size="default" className="py-20 flex items-center justify-center">
      <ErrorState
        variant="fullSection"
        title="Something went wrong"
        description="An unexpected error occurred. Please try again or return to the homepage."
        primaryAction={
          <Button variant="primary" size="md" onClick={() => reset()}>
            Try again
          </Button>
        }
      />
    </Container>
  );
}
