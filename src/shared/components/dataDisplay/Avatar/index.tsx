import { useEffect } from 'react';
import Image from 'next/image';
import { commentProfileAvatar } from './style';
import { AvatarSize } from './type';
import { parseSize } from './parseSize';

export const Avatar = (props: { src?: string; size?: AvatarSize }) => {
  const { src = '/', size = 'md', ...rest } = props;

  return (
    <div css={commentProfileAvatar(size)} {...rest}>
      <Image src={src} width={parseSize(size)} height={parseSize(size)} css={{ borderRadius: '50%' }} />
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
