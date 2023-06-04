import { breakpoints } from '../../constants';

type Breakpoint = Record<'md' | 'lg' | 'xl', number>;
export const breakpoint: Breakpoint = {
  ...breakpoints
};

export const mq: Record<keyof Breakpoint, string> = {
  md: `@media (min-width: ${breakpoint.md}px)`,
  lg: `@media (min-width: ${breakpoint.lg}px)`,
  xl: `@media (min-width: ${breakpoint.xl}px)`
};

export const reset = {
  margin: '0'
};
