import { useMemo } from 'react';
import { SKELETON_COLOR } from '@layout/constant';
import { css, keyframes } from '@emotion/react';

interface Props {
  width?: number | string;
  height?: number | string;
  circle?: boolean;
  rounded?: boolean;
  animation?: boolean;
  bgColor?: string;
  count?: number;
}

const keyframe = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`;

const createSkeletonUi = (skeletonProps: Props) => {
  const { animation, bgColor, circle, height, rounded, width } = skeletonProps;

  return css({
    ...(bgColor && { backgroundColor: bgColor }),
    ...(circle && { borderRadius: '50%' }),
    ...(rounded && { borderRadius: '8px' }),
    ...(height && { height }),
    ...(width && { height }),
    ...(animation && { animation: `${keyframe} 1s linear infinite` })
  });
};

export const Skeleton = (props: Props) => {
  const { animation, bgColor = SKELETON_COLOR, circle, height, rounded, width, count = 1 } = props;
  const skeletonStyle = createSkeletonUi({
    height,
    width,
    animation,
    bgColor,
    circle,
    rounded
  });

  const content = useMemo(() => [...Array({ length: count })].map(() => '-').join(''), [count]);

  return (
    <div css={skeletonStyle}>
      <span css={{ opacity: 0 }}>{content}</span>
    </div>
  );
};
