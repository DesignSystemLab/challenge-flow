import { useState } from 'react';
import { Header } from '@layout/components/Header';
import { Footer } from '@layout/components/Footer';
import { queryClient } from '@shared/queryClient';
import { mainWrapper } from '@layout/styles/main-style';
import reset from '@shared/styles/reset';
import { Global } from '@emotion/react';
import { QueryClientProvider, Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from '@jdesignlab/react';
import type { AppProps } from 'next/app';

const ChallengeFlow = ({ Component, pageProps }: AppProps<{ dehydratedState: unknown }>) => {
  const [globalQueryClient] = useState(() => queryClient);
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    import('../mocks');
  }
  return (
    <QueryClientProvider client={globalQueryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Global styles={reset} />
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
