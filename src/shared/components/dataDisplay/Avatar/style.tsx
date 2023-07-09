import { parseSize } from './parseSize';
import { AvatarSize } from './type';

export const commentProfileAvatar = (size: AvatarSize) => ({
  borderRadius: '50%',
  border: 'solid #e0e0e0 1px',
  width: parseSize(size),
  height: parseSize(size)
});
