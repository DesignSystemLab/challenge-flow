import { AvatarSize } from './type';

export const parseSize = (size: AvatarSize) => {
  let avatarSize = '40px';
  if (size === 'sm') avatarSize = '30px';
  if (size === 'lg') avatarSize = '50px';
  return avatarSize;
};
