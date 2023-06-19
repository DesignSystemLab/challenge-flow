import { mq } from '@shared/styles/mixins/responsive';
import { SCROLLBAR_COLOR } from '@layout/constant';
import { css } from '@emotion/react';

export const sidebarStyle = css({
  [mq.md]: {},
  [mq.lg]: {
    boxShadow: 'rgba(9, 30, 66, 0.25) 0px 0px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 0px',
    backgroundColor: '#FAF8FF',
    maxWidth: '256px',
    height: '100%',
    flexGrow: 1
  },
  [mq.xl]: {}
});

export const sidebarSectionStyle = css({
  position: 'static',
  [mq.md]: {},
  [mq.lg]: {
    position: 'relative',
    height: 'calc((100% - 72px) / 2)',
    overflowY: 'auto',
    margin: 0,
    '&::-webkit-scrollbar': {
      width: '8px',
      background: '#ffffff'
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '5px',
      background: `${SCROLLBAR_COLOR}`
    }
  }
});

export const memberListStyle = css({
  height: '100%',
  padding: '0',
  margin: 0,
  overflowY: 'auto'
});

export const memeberCardStyle = css({
  backgroundColor: '#fff',
  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  display: 'flex',
  padding: '4px 8px',
  [mq.md]: {},
  [mq.lg]: {},
  [mq.xl]: {}
});

export const profileStyle = css({
  [mq.md]: {},
  [mq.lg]: {
    width: '160px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'start',
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

export const scheduleListStyle = css({
  backgroundColor: 'red',
  padding: '0',
  margin: '0'
});

export const selectorStyle = css({
  [mq.md]: {},
  [mq.lg]: {
    padding: '4px',
    cursor: 'pointer',
    backgroundColor: '#fff',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
  },
  [mq.xl]: {}
});
