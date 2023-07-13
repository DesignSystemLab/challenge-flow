import { mq } from '@shared/styles/mixins/responsive';
import { css } from '@emotion/react';

export const statisticsWrapper = css({
  [mq.md]: {},
  [mq.lg]: {
    flexGrow: 4
  },
  [mq.xl]: {}
});
