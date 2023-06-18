import { ErrorBoundary } from 'react-error-boundary';
import { AsyncSuspense } from './AsyncSuspense';
import type { CompositionBoundaryProps } from '../types';

export const CompositionBoundary = (props: CompositionBoundaryProps) => {
  const { children, suspense: suspenseFallback, error: errorFallback, onRetry, ...restErrorProps } = props;

  const combineReset = () => {
    if (onRetry) {
      onRetry();
    }
  };

  return (
    <ErrorBoundary fallbackRender={errorFallback} onReset={combineReset} {...restErrorProps}>
      <AsyncSuspense fallback={suspenseFallback} children={children} />
    </ErrorBoundary>
  );
};
