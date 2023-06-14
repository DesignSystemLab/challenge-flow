import { mq } from '@shared/styles/mixins/responsive';
import { css } from '@emotion/react';

export const workspaceMainWrapper = css({
  [mq.md]: {},
  [mq.lg]: {
    border: '1px solid yellow',
    flexGrow: 9
  },
  [mq.xl]: {}
});
