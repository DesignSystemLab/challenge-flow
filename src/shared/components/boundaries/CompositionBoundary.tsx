import type { ReactElement, ReactNode } from 'react';
import { ErrorBoundary, ErrorBoundaryPropsWithRender } from 'react-error-boundary';
import { ErrorBoundaryWithQuery } from './ErrorBoundaryWithQuery';
import { AsyncSuspense } from './AsyncSuspense';

type ExceptFallbackErrorBoundaryAttributes = Omit<
  ErrorBoundaryPropsWithRender,
  'fallbackRender' | 'fallback' | 'FallbackComponent'
>;

interface CompositionBoundaryPerops extends ExceptFallbackErrorBoundaryAttributes {
  children: ReactNode;
  suspense: ReactElement;
  error: ErrorBoundaryPropsWithRender['fallbackRender'];
  queryBoundary?: boolean;
  onRetry?: (...args: unknown[]) => void;
}

export const CompositionBoundary = (props: CompositionBoundaryPerops) => {
  const {
    children,
    suspense: suspenseFallback,
    error: errorFallback,
    queryBoundary = false,
    onRetry,
    ...restErrorProps
  } = props;

  const combineReset = () => {
    if (onRetry) {
      onRetry();
    }
  };

  if (queryBoundary) {
    return (
      <ErrorBoundaryWithQuery fallback={errorFallback} {...restErrorProps}>
        <AsyncSuspense fallback={suspenseFallback} children={children} />
      </ErrorBoundaryWithQuery>
    );
  }

  return (
    <ErrorBoundary fallbackRender={errorFallback} onReset={combineReset} {...restErrorProps}>
      <AsyncSuspense fallback={suspenseFallback} children={children} />
    </ErrorBoundary>
  );
};
