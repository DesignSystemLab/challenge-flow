import { mq } from '@shared/styles/mixins/responsive';
import { css } from '@emotion/react';

export const workspaceListStyle = css({
  listStyle: 'none',
  padding: '0',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(264px, 1fr))',
  gap: '24px',
  justifyItems: 'center'
});

export const workspaceCardStyle = css({
  cursor: 'pointer',
  height: '296px',
  width: '288px',
  '&:hover': {
    boxShadow:
      'rgba(0, 0, 0, 0.2) 0px 5px 6px -3px, rgba(0, 0, 0, 0.14) 0px 9px 12px 1px, rgba(0, 0, 0, 0.12) 0px 3px 16px 2px'
  },
  transition: 'ease .25s'
});

export const workspacePostSummaryStyle = css({
  marginTop: '8px',
  height: '128px',
  maxHeight: '200px',
  width: 'auto',
  borderRadius: '12px',
  backgroundColor: '#f7f7f7',
  listStyle: 'none',
  padding: '8px'
});

export const workspacePostEmptyStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '8px',
  height: '128px',
  maxHeight: '200px',
  width: 'auto',
  borderRadius: '12px',
  backgroundColor: '#f7f7f7',
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
