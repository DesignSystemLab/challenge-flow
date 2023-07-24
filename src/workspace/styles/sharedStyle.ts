import { mq } from '@shared/styles/mixins/responsive';
import { css } from '@emotion/react';

export const titleWrapper = css({
  [mq.md]: {},
  [mq.lg]: {
    paddingLeft: '8px',
    paddingTop: '8px',
    backgroundColor: '#f48fb1',
    height: '36px',
    border: '1px solid #fff'
  },
  [mq.xl]: {}
});
