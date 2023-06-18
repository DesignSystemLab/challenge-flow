import { Loading } from '@shared/components/Icons';
import { Flex } from '@jdesignlab/react';
import { css } from '@emotion/react';

interface Props {
  width?: number | string;
  height?: number | string;
  bgColor?: `#${string}`;
}

export const Loader = (props: Props) => {
  const { width = '100%', height = '100%', bgColor } = props;

  const loaderStyle = () =>
    css({
      width,
      height,
      backgroundColor: bgColor || 'transparent'
    });

  return (
    <Flex direction="row" justify="center" items="center" css={loaderStyle}>
      <Loading />
    </Flex>
  );
};
