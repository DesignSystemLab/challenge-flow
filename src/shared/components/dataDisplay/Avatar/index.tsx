import Image from 'next/image';
import { commentProfileAvatar } from './style';
import { AvatarSize } from './type';
import { parseSize } from './parseSize';

export const Avatar = (props: { src?: string; size?: AvatarSize }) => {
  const { src, size = 'md', ...rest } = props;
  return (
    <div css={commentProfileAvatar(size)} {...rest}>
      {src && <Image src={src} width={parseSize(size)} height={parseSize(size)} css={{ borderRadius: '50%' }} />}
    </div>
  );
};

export const Group = ({ src, limit }: { src?: string[]; limit?: number }) => {
  const slicedArray = limit ? src?.slice(0, limit) : src;
  return (
    <div style={{ display: 'flex' }}>
      {slicedArray?.map((s: string, index: number) => (
        <div key={s} style={{ transform: `${index === 0 || 'translateX(-8px)'}` }}>
          <Avatar size="sm" src={s} />
        </div>
      ))}
    </div>
  );
};

Avatar.Group = Group;
