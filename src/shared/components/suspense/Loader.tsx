import { Loading } from '@shared/components/Icons';
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
      backgroundColor: bgColor || 'transparent',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center'
    });

  return (
    <div css={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div css={loaderStyle}>
        <Loading />
      </div>
    </div>
  );
};
