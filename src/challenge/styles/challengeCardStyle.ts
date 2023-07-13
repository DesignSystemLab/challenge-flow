import { css } from '@emotion/react';

export const challengeCardContainer = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gridGap: '20px',
  justifyContent: 'flex-start',
  marginBottom: '12px'
};

export const cardWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '16px 12px',
  gap: '8px',
  // width: '280px',
  borderRadius: '6px',
  boxShadow:
    'rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.04) 0px 4px 5px 0px, rgba(0, 0, 0, 0.06) 0px 1px 10px 0px',
  '&:hover': {
    cursor: 'pointer',
    boxShadow:
      'rgba(0, 0, 0, 0.2) 0px 5px 6px -3px, rgba(0, 0, 0, 0.14) 0px 9px 12px 1px, rgba(0, 0, 0, 0.12) 0px 3px 16px 2px'
  },
  transition: 'ease .25s'
});

export const cardTop = css({
  display: 'flex',
  gap: '4px',
  alignItems: 'center'
});

export const cardTitle = css({
  margin: 0,
  minHeight: '45px',
  lineHeight: '1.4',
  fontWeight: 'normal',
  fontSize: '16px',
  whiteSpace: 'normal',
  '-webkit-line-clamp': '2',
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',
  display: '-webkit-box'
});

export const cardWrittenInfoWrapper = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

export const cardWrittenUser = css({
  display: 'flex',
  gap: '4px',
  alignItems: 'center'
});

export const cardOptionContainer = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  background: '#f7f7f7',
  borderRadius: '4px',
  padding: '8px 12px'
});

export const cardEachOption = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

export const cardBottomWrapper = css({
  display: 'flex',
  alignItems: 'end',
  justifyContent: 'space-between',
  marginTop: 'auto'
});

export const cardAvatarWrapper = css({
  display: 'flex',
  alignItems: 'center',
  gap: '4px'
});

export const cardReactionWrapper = css({ display: 'flex', gap: '8px', alignItems: 'center' });
export const cardEachReaction = css({ display: 'flex', gap: '4px' });
