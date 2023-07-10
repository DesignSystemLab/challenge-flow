import { CSSObject } from '@emotion/react';

export interface MultipleNodeLayoutProps {
  children: React.ReactNode[];
  gap?: number;
  wrap?: boolean;
  style?: CSSObject;
}

export interface SingleNodeLayoutProps {
  children: React.ReactNode;
  style?: CSSObject;
}
