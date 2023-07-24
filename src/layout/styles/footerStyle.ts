import { FOOTER_WRAPPER_PADDING, FOOTER_WRAPPER_HEIGHT } from '@layout/constant';
import { mq } from '@shared/styles/mixins/responsive';
import { css } from '@emotion/react';

export const footerWrapper = css({
  margin: '0 auto',
  height: `${FOOTER_WRAPPER_HEIGHT}px`,
  background: '#f1f1f1'
});

export const footerContents = css({
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: `calc(100% - ${FOOTER_WRAPPER_PADDING * 2}px)`,
  padding: `${FOOTER_WRAPPER_PADDING}px`,

  [mq.md]: {},
  [mq.lg]: {},
  [mq.xl]: {
    maxWidth: '1200px'
  }
});
