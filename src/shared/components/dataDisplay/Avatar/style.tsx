type AvatarSize = 'sm' | 'md' | 'lg';
export const commentProfileAvatar = (size: AvatarSize) => {
  let avatarSize = '40px';
  if (size === 'sm') avatarSize = '30px';
  if (size === 'lg') avatarSize = '50px';

  return {
    borderRadius: '50%',
    border: 'solid #e0e0e0 1px',
    width: avatarSize,
    height: avatarSize
  };
};
