import { Button } from '@jdesignlab/react';
import type { FallbackProps } from 'react-error-boundary';

interface ErrorfallbackProps extends FallbackProps {
  title?: string;
  message?: string;
}

export const ChallengeListError = ({ ...errorProps }: ErrorfallbackProps) => {
  const { resetErrorBoundary } = errorProps;
  return (
    <div>
      <div>리스트를 가져오는 중에 문제가 발생했습니다.</div>
      <Button onClick={resetErrorBoundary}>재시도하기</Button>
    </div>
  );
};
