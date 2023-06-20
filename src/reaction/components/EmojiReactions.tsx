import { Flex } from '@jdesignlab/react';
import { EmojiAdd } from './EmojiAdd';
import { EmojiList } from './EmojiList';

export const EmojiReactions = ({ userId }: { userId: string }) => (
  <Flex align="center">
    <Flex.Item>
      <EmojiAdd userId={userId} />
    </Flex.Item>
    <Flex.Item>
      <EmojiList userId={userId} />
    </Flex.Item>
  </Flex>
);
