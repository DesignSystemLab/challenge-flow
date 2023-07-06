export const commentTextareaWrapperStyle = {
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

export const commentEachWrapperStyle = css({
  position: 'relative',
  padding: '12px 0',
  borderRadius: '2px',
  '&:not(:last-child)': {
    borderBottom: 'solid #e9e9e9 1px'
  }
});

export const commentProfileWrapperStyle = css({ display: 'flex', gap: '8px' });
export const commentFormEditStyle = css({
  display: 'flex',
  '& .j-textarea__wrapper': {
    flex: '2',
    '& .j-textarea__input': {
      width: '100%',
      minWidth: '100%'
    }
  }
});
