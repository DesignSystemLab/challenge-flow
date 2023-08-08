import { mq } from '@shared/styles/mixins/responsive';
import { SCROLLBAR_COLOR } from '@layout/constant';
import { css } from '@emotion/react';

export const sidebarStyle = css({
  flexGrow: 0,
  margin: 0,
  backgroundColor: '#FAF8FF',
  marginBottom: '36px',
  marginTop: '16px',
  [mq.lg]: {
    marginBottom: 0,
    maxWidth: '256px',
    height: '100%',
    flexGrow: 1
  }
});

export const sidebarSectionStyle = css({
  position: 'static',
  '&::-webkit-scrollbar': {
    width: '8px',
    background: '#ffffff'
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '4px',
    background: `${SCROLLBAR_COLOR}`
  },
  [mq.lg]: {
    position: 'relative',
    height: 'calc((100% - 72px) / 2)',
    overflowY: 'auto',
    margin: 0
  }
});

export const memberListStyle = css({
  margin: 0,
  padding: 0,
  [mq.md]: {
    height: '100%',
    padding: '0',
    margin: 0,
    overflowY: 'auto'
  }
});

export const memberCardStyle = css({
  backgroundColor: '#FAF8FF',
  display: 'flex',
  padding: '4px 8px',
  [mq.lg]: {
    backgroundColor: '#fff',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
  }
});

export const profileStyle = css({
  marginLeft: '8px',
  [mq.lg]: {
    width: '160px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'start',
    '& p': {
      width: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      wordBreak: 'break-all',
      WebkitLineClamp: 2
    }
  }
});

export const scheduleListStyle = css({
  padding: '0',
  margin: '0'
});

export const selectorStyle = css({
  '& button': {
    display: 'block',
    width: '100%',
    height: 'auto'
  },
  [mq.lg]: {
    padding: '4px',
    cursor: 'pointer',
    backgroundColor: '#fff',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
  }
});
