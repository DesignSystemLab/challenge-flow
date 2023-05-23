import type { AppProps } from 'next/app';
import { Header } from '@layout/components/Header';
import { Footer } from '@layout/components/Footer';
import { mainWrapper } from '@layout/styles/main-style';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const ChallengeFlow = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main css={mainWrapper}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </QueryClientProvider>
  );
};

export default ChallengeFlow;
