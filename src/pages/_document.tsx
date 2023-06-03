import { reset } from '@shared/styles/mixins/responsive';
import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => (
  <Html>
    <Head />
    <body css={reset}>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
