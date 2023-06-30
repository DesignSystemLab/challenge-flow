import type { ReactNode } from 'react';
import { Text } from '@jdesignlab/react';

interface Props {
  children: ReactNode;
  isOwnTab: boolean;
}

export const ContentNotExistTabItem = (props: Props) => {
  const { children, isOwnTab } = props;
  return isOwnTab ? (
    <>{children}</>
  ) : (
    <Text align="center" variant="heading">
      작성된 글이 없어요!
    </Text>
  );
};
