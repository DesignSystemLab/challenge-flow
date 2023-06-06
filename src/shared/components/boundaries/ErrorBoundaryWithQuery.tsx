import type { ReactNode } from 'react';
import { useQueryErrorResetBoundary } from 'react-query';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

interface ExtendFallbackProps extends FallbackProps {
  reset: (...args: unknown[]) => void;
  retry?: (...args: unknown[]) => void;
}

interface Props {
  children: ReactNode;
  fallback: (props: ExtendFallbackProps) => ReactNode;
  retry?: (...args: unknown[]) => void;
}

export const ErrorBoundaryWithQuery = (props: Props) => {
  const { children, fallback, retry } = props;
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }: FallbackProps) => (
        <>{fallback({ resetErrorBoundary, error, reset, retry })}</>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};
