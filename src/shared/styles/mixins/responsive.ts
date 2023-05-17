type Breakpoint = Record<'tabletport' | 'tabletland' | 'desktop', number>;
const breakpoint: Breakpoint = {
  tabletport: 600,
  tabletland: 900,
  desktop: 1200
};

export const mediaQuery: Record<keyof Breakpoint, string> = {
  tabletport: `@media (min-width: ${breakpoint['tabletport']}px)`,
  tabletland: `@media (min-width: ${breakpoint['tabletland']}px)`,
  desktop: `@media (min-width: ${breakpoint['desktop']}px)`
};
