import { mq } from '@shared/styles/mixins/responsive';
import { css } from '@emotion/react';

export const workspaceLayout = css({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  [mq.md]: {},
  [mq.lg]: {
    flexDirection: 'row'
  },
  [mq.xl]: {}
});
