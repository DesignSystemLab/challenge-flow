import { Button, Text, Flex } from '@jdesignlab/react';
import Link from 'next/link';

interface Props {
  workspaceId: string;
}

export const EmptyPost = (props: Props) => {
  const { workspaceId } = props;
  return (
    <article css={{ height: '100%' }}>
      <Flex justify="center" items="center" direction="column" style={{ height: '480px' }} gap="16px">
        <Text variant="heading" size="lg" color="primary-500">
          아직 글을 작성하시지 않으셨어요.
        </Text>
        <Button type="button" variant="outline">
          <Link
            href={{
              pathname: '/workspace/write',
              query: { workspaceId }
            }}
            as="/workspace/write"
          >
            작성하기
          </Link>
        </Button>
      </Flex>
    </article>
  );
};
