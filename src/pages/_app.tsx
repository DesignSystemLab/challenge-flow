import type { AppProps } from 'next/app';
import { Header } from '@layout/components/Header';
import { Footer } from '@layout/components/Footer';
import { mainWrapper } from '@layout/styles/main-style';

const ChallengeFlow = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <Header />
      <main css={mainWrapper}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
};

export default ChallengeFlow;
