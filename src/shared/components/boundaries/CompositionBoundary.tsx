import type { ReactElement, ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorBoundaryWithQuery } from './ErrorBoundaryWithQuery';
import { AsyncSuspense } from './AsyncSuspense';
import { CommonErrorFallback } from './CommonErrorFallback';
import type { FallbackProps } from 'react-error-boundary';

interface ExtendFallbackProps extends FallbackProps {
  reset?: (...args: unknown[]) => void;
  retry?: (...args: unknown[]) => void;
}

interface CompositionBoundaryProps {
  children: ReactNode;
  suspense: ReactElement<{ fallback: ReactElement }>;
  queryBoundary?: boolean;
  error: (props: ExtendFallbackProps) => ReactNode;
  reset?: (...args: unknown[]) => void;
  retry?: (...args: unknown[]) => void;
}

export const CompositionBoundary = (props: CompositionBoundaryProps) => {
  const { children, reset, retry, suspense, error: errorFallback = CommonErrorFallback, queryBoundary = false } = props;
  const { fallback: suspenseFallback } = suspense.props;

  if (queryBoundary) {
    return (
      <ErrorBoundaryWithQuery fallback={errorFallback}>
        <AsyncSuspense suspense={suspenseFallback} children={children} />
      </ErrorBoundaryWithQuery>
    );
  }

  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }: FallbackProps) => (
        <>{errorFallback({ resetErrorBoundary, error, reset, retry })}</>
      )}
    >
      <AsyncSuspense suspense={suspenseFallback} children={children} />
    </ErrorBoundary>
  );
};
