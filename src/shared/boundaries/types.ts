import type { ReactElement, ReactNode } from 'react';
import type { ErrorBoundaryPropsWithRender } from 'react-error-boundary';

type ExceptFallbackErrorBoundaryAttributes = Omit<
  ErrorBoundaryPropsWithRender,
  'fallbackRender' | 'fallback' | 'FallbackComponent'
>;

export interface CompositionBoundaryProps extends ExceptFallbackErrorBoundaryAttributes {
  children: ReactNode;
  suspense: ReactElement;
  error: ErrorBoundaryPropsWithRender['fallbackRender'];
  queryBoundary?: boolean;
  onRetry?: (...args: unknown[]) => void;
}
