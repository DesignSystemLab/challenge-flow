import {
  cardSkeletonWrapper,
  cardTop,
  cardWrittenInfoWrapper,
  challengeCardContainer
} from '@challenge/styles/challengeCardStyle';
import { Skeleton } from '@shared/components/suspense/Skeleton';

export const ChallengeSkeleton = () => (
  <div css={challengeCardContainer}>
    {Array(8)
      .fill('')
      .map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} css={cardSkeletonWrapper}>
          <div css={cardTop}>
            <Skeleton height="24px" width="40px" animation rounded />
          </div>
          <div>
            <Skeleton height="16px" animation rounded />
          </div>
          <div css={{ width: '140px' }}>
            <Skeleton height="16px" animation rounded />
          </div>

          <div css={cardWrittenInfoWrapper}>
            <Skeleton height="40px" circle animation />
            <Skeleton height="20px" rounded animation />
          </div>
          <Skeleton height="128px" rounded animation />
        </div>
      ))}
  </div>
);
