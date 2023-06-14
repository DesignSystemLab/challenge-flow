import { mq } from '@shared/styles/mixins/responsive';
import { SCROLLBAR_COLOR } from '@layout/constant';
import { css } from '@emotion/react';

export const sidebarStyle = css({
  backgroundColor: '#fff',
  [mq.md]: {},
  [mq.lg]: {
    backgroundColor: '##FAF8FF',
    maxWidth: '256px',
    flexGrow: 1
  },
  [mq.xl]: {}
});

export const sidebarSection = css({
  position: 'static',
  [mq.md]: {},
  [mq.lg]: {
    position: 'relative',
    maxHeight: '50%',
    overflow: 'auto',
    '&:last-child': {
      marginTop: '8px'
    },
    // scroll
    '&::-webkit-scrollbar': {
      width: '8px'
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '5px',
      background: `${SCROLLBAR_COLOR}`
    }
  },
  [mq.xl]: {}
});

export const listStyle = css({
  padding: '0 8px'
});

export const userCard = css({
  marginTop: '4px',
  boxShadow: 'rgba(33, 35, 38, 0.1) 0px 10px 10px -10px',
  display: 'flex',
  padding: '4px',
  [mq.md]: {},
  [mq.lg]: {},
  [mq.xl]: {}
});

export const selectorList = css({
  [mq.md]: {},
  [mq.lg]: {
    marginTop: '8px'
  },
  [mq.xl]: {}
});

export const userInfo = css({
  [mq.md]: {},
  [mq.lg]: {
    width: '160px',
    maxHeight: '36px',
    display: 'block',
    marginLeft: '8px',
    '& p': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      wordBreak: 'break-all',
      WebkitLineClamp: 2
    }
  },
  [mq.xl]: {}
});
