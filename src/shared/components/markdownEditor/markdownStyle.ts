import { mq } from '@shared/styles/mixins/responsive';
import { css } from '@emotion/react';

const DEFAULT_PREVIEW_HEIGHT = 720;
export const markdownSection = css({
  flexGrow: 1,
  [mq.md]: {},
  [mq.lg]: {},
  [mq.xl]: {}
});

export const previewSection = (height?: number) =>
  css({
    boxSizing: 'border-box',
    padding: '12px',
    width: '100%',
    border: '1px solid #ededed',
    borderRadius: '8px',
    marginTop: '8px',
    marginLeft: '0',
    boxShadow: '0px 10px 10px -10px rgba(33, 35, 38, 0.1)',
    height: `${height ?? DEFAULT_PREVIEW_HEIGHT}px`,
    overflow: 'auto',
    [mq.md]: {
      marginTop: '0'
    }
  });

export const markdownWrap = css({
  display: 'flex',
  flexDirection: 'column',
  [mq.md]: {
    flexDirection: 'row'
  },
  [mq.lg]: {},
  [mq.xl]: {}
});
