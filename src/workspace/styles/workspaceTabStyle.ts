import { mq } from '@shared/styles/mixins/responsive';
import { css } from '@emotion/react';

export const workspaceTabListStyle = css({
  padding: '0 16px 8px 16px',
  [mq.lg]: {
    '& article': {
      margin: '8px auto'
    }
  }
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
  }
});
