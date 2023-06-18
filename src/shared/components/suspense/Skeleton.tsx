import { SKELETON_COLOR } from '@layout/constant';
import { css, keyframes } from '@emotion/react';

interface Props {
  width?: number | string;
  height?: number | string;
  circle?: boolean;
  rounded?: boolean;
  animation?: boolean;
  bgColor?: string;
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
  const { animation, bgColor = SKELETON_COLOR, circle, height, rounded, width } = props;
  const skeletonStyle = createSkeletonUi({
    height,
    width,
    animation,
    bgColor,
    circle,
    rounded
  });

  return (
    <div css={skeletonStyle}>
      <span css={{ opacity: 0 }}>skelton</span>
    </div>
  );
};
