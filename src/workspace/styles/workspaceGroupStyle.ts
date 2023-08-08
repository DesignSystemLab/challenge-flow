import { mq } from '@shared/styles/mixins/responsive';
import { css } from '@emotion/react';

export const workspaceGroupWrapper = css({
  padding: '8px 16px',
  [mq.lg]: {},
  [mq.xl]: {}
});

export const workspaceBarChartWrapper = css({
  width: '100%',
  maxWidth: '480px',
  height: '180px',
  [mq.md]: { height: '240px' },
  [mq.lg]: { height: '280px' }
});
