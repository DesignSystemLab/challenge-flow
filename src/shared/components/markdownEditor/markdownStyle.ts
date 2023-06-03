import { css } from '@emotion/react';
import { mq } from '@shared/styles/mixins/responsive';

const PREVIEW_BACKGROUND = '#f1f2f6';
const DEFAULT_PREVIEW_HEIGHT = 720;

export const markdownSection = css({
  flexGrow: 1,
  pre: {
    width: '100%'
  },
  textarea: {
    width: '100%',
    resize: 'none'
  },
  [mq.md]: {},
  [mq.lg]: {},
  [mq.xl]: {}
});

export const previewSection = (height?: number) => {
  return css({
    boxSizing: 'border-box',
    padding: '12px',
    width: '100%',
    flexGrow: 1,
    border: '1px solid #ededed',
    borderRadius: '8px',
    marginTop: '8px',
    marginLeft: '0',
    boxShadow: '1px 2px 2px rgba(0, 0, 0, 0.1)',
    backgroundColor: PREVIEW_BACKGROUND,
    height: `${height ?? DEFAULT_PREVIEW_HEIGHT}px`,
    overflow: 'auto',
    div: {
      backgroundColor: PREVIEW_BACKGROUND
    },
    [mq.md]: {
      marginTop: '0',
      marginLeft: '8px',
      maxWidth: '480px'
    }
  });
};

export const markdownWrap = css({
  display: 'flex',
  flexDirection: 'column',
  [mq.md]: {
    flexDirection: 'row'
  },
  [mq.lg]: {},
  [mq.xl]: {}
});
