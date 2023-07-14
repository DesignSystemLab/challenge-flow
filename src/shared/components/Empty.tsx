import Image from 'next/image';
import { Flex, Text } from '@jdesignlab/react';

interface Props {
  message?: string;
}
export const Empty = (props: Props) => {
  const { message = '데이터가 없습니다.' } = props;
  return (
    <div css={{ width: '100%', height: '100vh' }}>
      <Flex items="center" justify="center" direction="column" css={{ width: '100%', height: '100%' }} gap={32}>
        <Text variant="heading" size="xl">
          {message}
        </Text>
        <Image src="/images/note.png" width={128} height={128} />
      </Flex>
    </div>
  );
};
