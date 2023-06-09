import { mq } from '@shared/styles/mixins/responsive';
import { css } from '@emotion/react';

export const mainWrapper = css({
  position: 'relative'
});

export const mainChallengeButton = css({
  position: 'absolute',
  right: 0,
  display: 'flex',
  gap: '4px',
  justifyContent: 'space-between',
  marginBottom: '8px',
  flexWrap: 'wrap-reverse'
});

export const challengeCreateButtonWrapper = css({
  position: 'absolute',
  right: 0,
  top: '8px'
});

export const challengeInfoWrapperStyle = css({
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap',
  [mq.lg]: {
    flexWrap: 'nowrap'
  }
});

export const challengeInfoDdayStyle = css({
  width: '80px',
  border: 'solid 1px #e1e1e1',
  padding: '6px 0 4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'start'
});

export const challengeInfoTitleStyle = css({
  display: 'inline',
  fontSize: '28px',
  lineHeight: '1.4',
  fontWeight: '700'
});

export const challengeInfoHeadingButtonWrapperStyle = css({ display: 'inline-flex', gap: '4px', flexWrap: 'nowrap' });

export const challengeInfoUserWrapperStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '8px',
  alignItems: 'center'
});

export const challengeInfoUserStyle = css({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  gap: '8px',
  borderRadius: '8px',
  padding: '4px 8px',
  '&:hover': {
    background: '#e7e7e7'
  }
});

export const challengeInfoOptionListWrapperStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  marginTop: '12px',
  padding: '16px 20px',
  background: '#fafafa'
});

export const challengeInfoOptionListItemStyle = css({ display: 'flex', gap: '12px', alignItems: 'end' });

export const challengeInfoSectionStyle = css({
  position: 'relative',
  width: '100%',
  [mq.lg]: { flex: '0 1 900px' }
});

export const challengeApplyButtonWrapperStyle = css({
  margin: '20px 0 40px',
  display: 'flex',
  gap: '8px',
  justifyContent: 'center'
});
