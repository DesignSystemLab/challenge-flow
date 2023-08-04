import { mq } from '@shared/styles/mixins/responsive';
import { css } from '@emotion/react';

export const suggestionAsideStyle = css({
  position: 'fixed',
  minWidth: '300px',
  height: '300px',
  top: '80px',
  right: 0,
  flex: ' 0 1 300px',
  flexGrow: 1,
  padding: '8px',
  [mq.lg]: { flexGrow: 0 },
  [mq.xl]: {}
});

export const suggestionHeaderStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#dceafa',
  padding: '8px 8px 6px'
};

export const suggestListWrapperStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: 0
});
