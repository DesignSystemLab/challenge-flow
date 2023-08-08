import { mq } from '@shared/styles/mixins/responsive';
import { css } from '@emotion/react';

export const workspaceTabListStyle = css({
  padding: '0 16px',
  marginTop: 0,
  [mq.md]: {
    paddingBottom: '16px',
    marginTop: '36px'
  },
  [mq.lg]: {
    marginTop: 0,
    '& article': {
      margin: '8px auto'
    }
  }
});
