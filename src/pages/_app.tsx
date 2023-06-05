import { useState } from 'react';
import { Header } from '@layout/components/Header';
import { Footer } from '@layout/components/Footer';
import { queryClient } from '@shared/queryClient';
import { mainWrapper } from '@layout/styles/main-style';
import { QueryClientProvider, Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from '@jdesignlab/react';
import type { AppProps } from 'next/app';

const ChallengeFlow = ({ Component, pageProps }: AppProps<{ dehydratedState: unknown }>) => {
  const [globalQueryClient] = useState(() => queryClient);
  return (
    <QueryClientProvider client={globalQueryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider>
          <Header />
          <main css={mainWrapper}>
            <Component {...pageProps} />
          </main>
          <Footer />
        </ThemeProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
export default ChallengeFlow;
