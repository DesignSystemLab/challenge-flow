import { mq } from '@shared/styles/mixins/responsive';
import { BORDER_COLOR } from '@layout/constant';
import { css } from '@emotion/react';

export const workspaceMainWrapper = css({
  border: `1px solid ${BORDER_COLOR}`,
  borderRadius: '4px',
  padding: '16px 0',
  margin: 0,
  [mq.lg]: {
    margin: '16px 0 0 16px',
    flexGrow: 8
  }
});

export const workspaceFlexItemStyle = (height: string) =>
  css({
    height: 'auto',
    [mq.lg]: {
      height
    }
  });
