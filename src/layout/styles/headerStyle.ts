import { HEADER_WRPPER_HEIGHT } from '@layout/constant';
import { mq } from '@shared/styles/mixins/responsive';
import { css } from '@emotion/react';

export const headerWrapper = () =>
  css({
    boxShadow: '0px 13px 27px -26px rgba(133,133,133,0.75)',
    height: `${HEADER_WRPPER_HEIGHT}px`,
    boxSizing: 'border-box'
  });

export const headerContents = {
  margin: '0 auto',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 8px',
  [mq.xl]: {
    maxWidth: '1200px'
  }
};

export const headerLogo = {
  height: '100%',
  margin: '0',
  display: 'flex',
  alignItems: 'center',
  fontWeight: 'bolder',
  fontSize: '32px',
  cursor: 'pointer',

  [mq.md]: {
    fontSize: '34px'
  },
  [mq.lg]: {
    fontSize: '36px'
  },
  [mq.xl]: {
    fontSize: '38px'
  }
};
