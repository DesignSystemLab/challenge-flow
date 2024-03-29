import { mq } from '@shared/styles/mixins/responsive';
import { HEADER_WRPPER_HEIGHT, FOOTER_WRAPPER_HEIGHT, MAIN_WRPPAER_PADDING } from '../constant';

export const mainWrapper = {
  margin: '0 auto',
  overflow: 'auto',
  minHeight: `calc(100vh - ${HEADER_WRPPER_HEIGHT}px - ${FOOTER_WRAPPER_HEIGHT}px)`,
  padding: `${MAIN_WRPPAER_PADDING}px`,
  [mq.xl]: {
    maxWidth: '1200px'
  }
};
