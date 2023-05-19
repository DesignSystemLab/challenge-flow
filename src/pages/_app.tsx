import type { AppProps } from 'next/app';
import { ThemeProvider } from '@jdesignlab/react';

const ChallengeFlow = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default ChallengeFlow;
