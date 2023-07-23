import { useState } from 'react';
import { HeadMeta } from '@layout/components/HeadMeta';
import { Header } from '@layout/components/Header';
import { Footer } from '@layout/components/Footer';
import { queryClient } from '@shared/queryClient';
import { mainWrapper } from '@layout/styles/mainStyle';
import reset from '@shared/styles/reset';
import { Global } from '@emotion/react';
import { QueryClientProvider, Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from '@jdesignlab/react';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import type { AppProps } from 'next/app';

const ChallengeFlow = ({ Component, pageProps }: AppProps<{ dehydratedState: unknown; session: Session }>) => {
  const { session, ...restProps } = pageProps;
  const [globalQueryClient] = useState(() => queryClient);

  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    import('../mocks');
  }
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={globalQueryClient}>
        <Hydrate state={restProps.dehydratedState}>
          <Global styles={reset} />
          <ThemeProvider>
            <HeadMeta />
            <Header />
            <main css={mainWrapper}>
              <Component {...restProps} />
            </main>
            <Footer />
          </ThemeProvider>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  );
};
export default ChallengeFlow;
