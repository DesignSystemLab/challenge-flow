import { css } from '@emotion/react';

export const timeAgoStyle = (wrap: boolean) =>
  css({
    display: 'flex',
    flexDirection: wrap ? 'column' : 'row'
  });
