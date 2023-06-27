import { commentProfileAvatar } from './style';

type AvatarSize = 'sm' | 'md' | 'lg';

export const Avatar = ({ size }: { size: AvatarSize }) => <div css={commentProfileAvatar(size)}> </div>;
