import { mq } from '@shared/styles/mixins/responsive';
import { css } from '@emotion/react';

export const workspaceListStyle = css({
  listStyle: 'none',
  padding: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '32px',
  [mq.md]: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    justifyItems: 'center'
  }
});

export const workspaceCardStyle = css({
  cursor: 'pointer',
  minHeight: '240px',
  minWidth: '320px',
  '&:hover': {
    boxShadow:
      'rgba(0, 0, 0, 0.2) 0px 5px 6px -3px, rgba(0, 0, 0, 0.14) 0px 9px 12px 1px, rgba(0, 0, 0, 0.12) 0px 3px 16px 2px'
  },
  [mq.lg]: {
    minHeight: '320px'
  }
});

export const workspacePostSummaryStyle = css({
  marginTop: '8px',
  height: '120px',
  width: 'auto',
  borderRadius: '12px',
  backgroundColor: '#f5f6fa',
  listStyle: 'none',
  padding: '8px'
});

export const workspacePostEmptyStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '8px',
  height: '120px',
  width: 'auto',
  borderRadius: '12px',
  backgroundColor: '#f5f6fa',
  listStyle: 'none',
  padding: '8px'
});

export const workspaceFilterStyle = css({
  width: '180px',
  [mq.md]: {},
  [mq.lg]: {
    padding: '0 20px',
    marginBottom: '8px'
  },
  [mq.xl]: {}
});
