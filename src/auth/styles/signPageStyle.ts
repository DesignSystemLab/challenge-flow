import { css } from '@emotion/react';

export const signFormContainer = css({
  height: 'fit-content',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '24px 16px'
});

export const title = css({
  textAlign: 'center'
});

export const signButtonWrapper = css({
  display: 'flex',
  marginTop: '32px',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
});
