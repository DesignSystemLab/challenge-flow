import { CSSObject } from '@emotion/react';

export interface MultipleNodeLayoutProps {
  children: React.ReactNode[];
  gap?: number;
  wrap?: boolean;
  css?: CSSObject;
}

export interface SingleNodeLayoutProps {
  children: React.ReactNode;
  css?: CSSObject;
}
