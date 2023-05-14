import type { AppProps } from 'next/app';

const ChallengeFlow = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default ChallengeFlow;
