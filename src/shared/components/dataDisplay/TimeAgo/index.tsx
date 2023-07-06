import { getTimeDiff } from '@shared/utils/date';
import { Text } from '@jdesignlab/react';
import { timeAgoStyle } from './style';

type TextSize = 'sm' | 'md' | 'lg';
export const TimeAgo = ({
  createdAt,
  updatedAt,
  size,
  wrap
}: {
  createdAt: string;
  updatedAt?: string | undefined;
  size?: TextSize;
  wrap?: boolean;
}) => (
  <>
    {updatedAt ? (
      <div css={timeAgoStyle(!!wrap)}>
        <Text variant="label" size={size ?? 'md'}>
          {getTimeDiff(createdAt)} 작성&nbsp;
        </Text>

        <Text variant="label" size={size ?? 'md'}>
          ({getTimeDiff(updatedAt)} 수정)
        </Text>
      </div>
    ) : (
      <Text variant="label" size={size ?? 'md'}>
        {getTimeDiff(createdAt)} 작성
      </Text>
    )}
  </>
);
