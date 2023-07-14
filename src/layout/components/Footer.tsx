import Image from 'next/image';
import { footerWrapper, footerContents } from '../styles/footerStyle';

export const Footer = () => (
  <footer css={footerWrapper}>
    <div css={footerContents}>
      <Image src="/images/f-lab-logo.png" width={120} height={40} />
    </div>
  </footer>
);
