import { ThemeProvider } from '@jdesignlab/react';
import { queryClient } from '@shared/queryClient';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import type { AppProps } from 'next/app';
import { useState } from 'react';

const ChallengeFlow = ({ Component, pageProps }: AppProps<{ dehydratedState: unknown }>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default ChallengeFlow;
