import { mq } from '@shared/styles/mixins/responsive';
import { css } from '@emotion/react';

export const statisticsWrapper = css({
  [mq.md]: {},
  [mq.lg]: {
    border: '1px solid yellow',
    flexGrow: 4
  },
  [mq.xl]: {}
});
