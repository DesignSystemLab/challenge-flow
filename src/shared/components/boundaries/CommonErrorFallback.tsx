import { Button, Text } from '@jdesignlab/react';
import type { FallbackProps } from 'react-error-boundary';

interface ErrorfallbackProps extends FallbackProps {
  title?: string;
  message?: string;
}

export const CommonErrorFallback = ({ ...errorProps }: ErrorfallbackProps) => {
  const { message, title, error, resetErrorBoundary } = errorProps;

  return (
    <div
      css={{
        display: 'inline-block'
      }}
    >
      {title && (
        <Text size="md" as="h2">
          {title}
        </Text>
      )}
      <Text>{message || error.message}</Text>
      <Button onClick={resetErrorBoundary} type="button">
        재시도
      </Button>
    </div>
  );
};
