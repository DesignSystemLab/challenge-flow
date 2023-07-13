import { mq } from '@shared/styles/mixins/responsive';
import { css } from '@emotion/react';

export const workspaceGroupWrapper = css({
  padding: '8px 16px',
  [mq.md]: {},
  [mq.lg]: {},
  [mq.xl]: {}
});

export const workspaceBarChartWrapper = css({
  maxWidth: '100%',
  height: '320px',
  [mq.md]: { maxWidth: '480px', height: '320px' },
  [mq.lg]: {},
  [mq.xl]: {}
});

export const someComponentStyleWithSelector = css({
  cursor: 'pointer',
  minHeight: '240px',
  width: '320px',
  '& ol': {
    borderStyle: 'none',
    listStyle: 'none',
    padding: '0'
  },
  [mq.md]: {},
  [mq.lg]: {
    minHeight: '320px'
  },
  [mq.xl]: {}
});
