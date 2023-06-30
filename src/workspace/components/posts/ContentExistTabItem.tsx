import type { ReactNode } from 'react';
import { Button, Flex } from '@jdesignlab/react';

interface Props {
  children: ReactNode;
  isOwnPost: boolean;
  isOwnTab: boolean;
}

export const ContentExistTabItem = (props: Props) => {
  const { children, isOwnPost, isOwnTab } = props;

  if (!isOwnPost) {
    return null;
  }
  return (
    <Flex direction="column" justify="center" gap="8px" style={{ height: '100%' }}>
      {children}
      {isOwnTab && (
        <Flex direction="row" gap="8px" justify="flex-end">
          <Button color="red-lighten2" onClick={() => {}}>
            삭제
          </Button>
          <Button type="button">수정</Button>
        </Flex>
      )}
    </Flex>
  );
};
