import type { AppProps } from 'next/app';
import { Header } from '@layout/components/Header';
import { Footer } from '@layout/components/Footer';
import { mainWrapper } from '@layout/styles/main-style';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GlobalErrorBoundary } from '@shared/components/GlobalErrorBoundary';
import { Suspense } from 'react';

const ChallengeFlow = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: {
      suspense: true
    }
  });

  return (
    <GlobalErrorBoundary fallback={<div>error!</div>}>
      <QueryClientProvider client={queryClient}>
        {/* <Suspense fallback={<div>loading...</div>}> */}
        <Header />
        <main css={mainWrapper}>
          <Component {...pageProps} />
        </main>
        {/* </Suspense> */}
        <Footer />
      </QueryClientProvider>
    </GlobalErrorBoundary>
  );
};

export default ChallengeFlow;
