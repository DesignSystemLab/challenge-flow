import { Skeleton } from './Skeleton';

interface Props {
  count?: number;
}
export const ProfileSkeleton = (props: Props) => {
  const { count = 1 } = props;
  const skleletons = Array(count)
    .fill(null)
    .map((_, index) => ({ id: index + 1 }));

  return (
    <ul css={{ padding: '8px 0', margin: 0, backgroundColor: 'white' }}>
      {skleletons.map((item) => (
        <li key={item.id} css={{ padding: '4px', display: 'flex', width: '256px', minHeight: '36px', gap: '8px' }}>
          <div css={{ flexGrow: 2, maxWidth: '24px', minWidth: '64px' }}>
            <Skeleton circle width="64px" height="64px" animation />
          </div>
          <div css={{ flexGrow: 3, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Skeleton rounded animation width="8px" />
            <Skeleton rounded animation width="8px" />
          </div>
        </li>
      ))}
    </ul>
  );
};
