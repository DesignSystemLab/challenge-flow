import { css } from '@emotion/react';

export const reactionWrapperStyle = css({ display: 'flex', flexDirection: 'column', gap: '12px' });

export const commentTextareaWrapper = {
  display: 'flex',
  gap: '12px',
  '& .j-textarea__wrapper': {
    width: '100%',
    flex: '2',
    '& .j-textarea__input': {
      width: '100%',
      maxWidth: '100%',
      minHeight: '100%'
    }
  },
  '& button': {
    marginTop: 'auto'
  }
};

export const eachCommentWrapper = css({
  position: 'relative',
  padding: '12px 0',
  borderRadius: '2px',
  '&:not(:last-child)': {
    borderBottom: 'solid #e9e9e9 1px'
  }
});

export const profileWrapper = css({ display: 'flex', gap: '8px' });

export const profileInfo = css({
  width: '100px'
});

export const contentWrapper = css({
  flex: '2'
});

export const editForm = css({
  display: 'flex',
  gap: '8px',
  '& .j-textarea__wrapper': {
    flex: '2',
    '& .j-textarea__input': {
      width: '100%',
      minWidth: '100%'
    }
  }
});

export const editButtonWrapper = css({
  marginTop: 'auto'
});

export const defaultButtonWrapper = css({
  marginLeft: 'auto'
});
