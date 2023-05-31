import { reset } from '@shared/styles/mixins/responsive';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head />
      <body css={reset}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
