import Image from 'next/image';

export const Banner = () => (
  <div
    style={{
      height: '350px',
      background: '#f1f1f1',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'grey'
    }}
  >
    <Image src="/images/banner.png" height={350} width={1200} />
  </div>
);
