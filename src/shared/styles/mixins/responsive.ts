type Breakpoint = Record<'md' | 'lg' | 'xl', number>;
const breakpoint: Breakpoint = {
  md: 600,
  lg: 900,
  xl: 1200
};

export const mq: Record<keyof Breakpoint, string> = {
  md: `@media (min-width: ${breakpoint['md']}px)`,
  lg: `@media (min-width: ${breakpoint['lg']}px)`,
  xl: `@media (min-width: ${breakpoint['xl']}px)`
};

export const reset = {
  margin: '0'
};
