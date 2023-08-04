import { Skeleton } from '@shared/components/suspense/Skeleton';
import { workspaceListStyle } from '@workspace/styles/workspaceListStyle';
import { Box, Card } from '@jdesignlab/react';

interface Props {
  count?: number;
}

export const WorkspaceCardSkeleton = (props: Props) => {
  const { count = 1 } = props;
  const skeletons = Array(count)
    .fill(null)
    .map((_, index) => ({ id: index + 1 }));
  return (
    <ul css={workspaceListStyle}>
      {skeletons.map(({ id }) => (
        <Card key={id}>
          <Card.Header css={{ marginTop: '8px' }}>
            <Skeleton rounded width="160px" height="28px" animation />
          </Card.Header>
          <Card.Body css={{ marginTop: '16px' }}>
            <Skeleton rounded width="240px" height="128px" animation />
          </Card.Body>
          <Card.Footer css={{ marginTop: '16px' }}>
            <Skeleton rounded width="232px" height="28px" animation />
            <Box css={{ marginTop: '16px' }} />
            <Skeleton circle width="32px" height="32px" animation />
          </Card.Footer>
        </Card>
      ))}
    </ul>
  );
};
