import { mq } from '@shared/styles/mixins/responsive';
import { css } from '@emotion/react';

export const workspaceMainWrapper = css({
  [mq.md]: {},
  [mq.lg]: {
    flexGrow: 8
  },
  [mq.xl]: {}
});
