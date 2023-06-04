import React, { useCallback, useEffect } from 'react';
import { breakpoints } from '../constants/breakpoints';
import type { Breakpoint } from '../constants/breakpoints';

export const useWindowSize = () => {
  const isSSR = typeof window === 'undefined';
  const [windowSize, setWindowSize] = React.useState<{
    breakpoint: keyof Breakpoint;
    height: number;
    width: number;
  }>({
    breakpoint: 'lg',
    width: isSSR ? 1200 : window.innerWidth,
    height: isSSR ? 800 : window.innerHeight
  });

  const detectBreakpoints = (width: number): keyof Breakpoint | 'sm' => {
    if (width < breakpoints.md) {
      return 'sm';
    }
    if (width < breakpoints.lg) {
      return 'md';
    }
    if (width < breakpoints.xl) {
      return 'lg';
    }
    return 'xl';
  };

  const onResize = (onChange: () => void) => {
    window.addEventListener('resize', onChange);
  };

  const changeWindowSize = useCallback(() => {
    const { innerWidth } = window;
    setWindowSize({ width: innerWidth, height: window.innerHeight, breakpoint: detectBreakpoints(innerWidth) });
  }, []);

  useEffect(() => {
    onResize(changeWindowSize);
    return () => {
      onResize(changeWindowSize);
    };
  }, [changeWindowSize]);

  return windowSize;
};
