// import Image from 'next/image';
import { useEffect } from 'react';
import { commentProfileAvatar } from './style';

type AvatarSize = 'sm' | 'md' | 'lg';

export const Avatar = (props: { src?: string; size?: AvatarSize }) => {
  const { size = 'md', ...rest } = props;
  return (
    <div css={commentProfileAvatar(size)} {...rest}>
      {/* <Image src={src} layout="fill" /> */} {/* {src} */}
    </div>
  );
};

export const Group = ({ src }: { src: string[] }) => {
  useEffect(() => {}, []);
  return (
    <div style={{ display: 'flex' }}>
      {src.map((s: string, index: number) => (
        <div key={s} style={{ marginLeft: `${index === 0 || '-12px'}` }}>
          <Avatar size="sm" src={s} />
        </div>
      ))}
    </div>
  );
};

Avatar.Group = Group;
