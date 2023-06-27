import { mq } from '@shared/styles/mixins/responsive';
import { css } from '@emotion/react';

export const challengeInfoWrapperStyle = css({
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap',
  [mq.lg]: {
    flexWrap: 'nowrap'
  }
});

export const challengeInfoSectionStyle = css({
  position: 'relative',
  width: '100%',
  [mq.lg]: { flex: '0 1 900px' }
});
