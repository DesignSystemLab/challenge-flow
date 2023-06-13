import { mq } from '@shared/styles/mixins/responsive';
import { css } from '@emotion/react';

export const titleWrapper = css({
  backgroundColor: '#fff',
  position: 'static',
  [mq.md]: {},
  [mq.lg]: {
    position: 'sticky',
    top: '0px',
    zIndex: '2',
    paddingLeft: '8px',
    paddingTop: '8px',
    backgroundColor: '#4695E5',
    height: '36px',
    border: '1px solid #fff',
    borderRadius: '8px'
  },
  [mq.xl]: {}
});