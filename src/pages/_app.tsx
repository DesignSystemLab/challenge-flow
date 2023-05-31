import type { AppProps } from 'next/app';
import { ThemeProvider } from '@jdesignlab/react';
import { Header } from '@layout/components/Header';
import { Footer } from '@layout/components/Footer';
import { queryClient } from '@shared/queryClient';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { mainWrapper } from '@layout/styles/main-style';
import { useState } from 'react';

const ChallengeFlow = ({ Component, pageProps }: AppProps<{ dehydratedState: unknown }>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
          <Header />
          <main css={mainWrapper}>
              <Component {...pageProps} />
          </main>
       <Footer />
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default ChallengeFlow;
