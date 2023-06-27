import { FOOTER_WRAPPER_PADDING, FOOTER_WRAPPER_HEIGHT } from '@layout/constant';
import { mq } from '@shared/styles/mixins/responsive';

export const footerWrapper = {
  margin: '0 auto',
  height: `${FOOTER_WRAPPER_HEIGHT}px`,
  background: 'lightgrey'
};

export const footerContents = {
  margin: '0 auto',
  height: `calc(100% - ${FOOTER_WRAPPER_PADDING * 2}px)`,
  padding: `${FOOTER_WRAPPER_PADDING}px`,

  [mq.md]: {},
  [mq.lg]: {},
  [mq.xl]: {
    maxWidth: '1200px'
  }
};
