import type { ReactNode } from 'react';
import { useQueryErrorResetBoundary } from 'react-query';
import { ErrorBoundary, ErrorBoundaryPropsWithRender } from 'react-error-boundary';

type ExceptFallbackErrorBoundaryAttributes = Omit<
  ErrorBoundaryPropsWithRender,
  'fallbackRender' | 'fallback' | 'FallbackComponent'
>;

interface Props extends ExceptFallbackErrorBoundaryAttributes {
  children: ReactNode;
  fallback: ErrorBoundaryPropsWithRender['fallbackRender'];
  onRetry?: (...args: unknown[]) => void;
}

export const ErrorBoundaryWithQuery = (props: Props) => {
  const { children, fallback, onRetry, ...restErrorProps } = props;
  const { reset: reactQueryReset } = useQueryErrorResetBoundary();

  const combineReset = () => {
    reactQueryReset();
    if (onRetry) {
      onRetry();
    }
  };

  return (
    <ErrorBoundary fallbackRender={fallback} onReset={combineReset} {...restErrorProps}>
      {children}
    </ErrorBoundary>
  );
};
