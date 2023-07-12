import { Button, Text, Stack } from '@jdesignlab/react';
import type { FallbackProps } from 'react-error-boundary';

export const WorkspaceError = (errorProps: FallbackProps) => {
  const { resetErrorBoundary } = errorProps;

  return (
    <div
      css={{
        display: 'inline-block'
      }}
    >
      <Stack justify="center" align="center">
        <Text size="lg" variant="heading">
          리스트를 가져오는 중에 문제가 발생했습니다.
        </Text>
        <Button onClick={resetErrorBoundary} type="button">
          재시도
        </Button>
      </Stack>
    </div>
  );
};
