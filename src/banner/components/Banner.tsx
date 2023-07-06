import Image from 'next/image';

export const Banner = () => (
  <div
    style={{
      height: '350px',
      background: '#f1f1f1',
      border: 'dashed 1px grey',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'grey'
    }}
  >
    준비중...
    {/* <Image src="/images/banner.svg" height="350px" width="1200px" /> */}
  </div>
);
