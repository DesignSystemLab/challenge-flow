import { useContext, useEffect, useState } from 'react';
import { calculateEmojiCount } from '@reaction/utils/calculateEmojiCount';
import { getReactedEmojiId } from '@reaction/utils/getReactedEmojiId';
import { useQuery } from 'react-query';
import { Flex } from '@jdesignlab/react';
import { useCreateEmoji } from '../hooks/useCreateEmoji';
import { useDeleteEmoji } from '../hooks/useDeleteEmoji';
import { ReactionContext } from '../context';
import fetchReadEmojiList from '../remotes/fetchReadEmojiList';
import { EmojiDataWithEmojiKey, EmojiDataWithId } from '../types';

export const EmojiList = ({ userId }: { userId: string }) => {
  const { originId } = useContext(ReactionContext);
  const { data } = useQuery(`emoji-${originId}`, () => fetchReadEmojiList({ originId }));
  const { onSubmit } = useCreateEmoji(originId, userId);
  const { onDelete } = useDeleteEmoji(originId);
  const [emojiCount, setEmojiCount] = useState<EmojiDataWithEmojiKey>({});

  useEffect(() => {
    if (data) {
      setEmojiCount(calculateEmojiCount(data));
    }
  }, [data]);

  const toggleEmoji = (emojiKey: string, values: EmojiDataWithId[]) => {
    const reactedEmojiId = getReactedEmojiId(values, userId);
    if (reactedEmojiId) {
      onDelete(reactedEmojiId);
    } else {
      onSubmit(emojiKey);
    }
  };

  return (
    <Flex>
      {data &&
        data.length > 0 &&
        Object.entries<EmojiDataWithId[]>(emojiCount)
          .sort()
          .map(([key, value], index: number) => (
            <Flex.Item
              key={key}
              onClick={() => toggleEmoji(key, value)}
              className={`emoji-list-${index + 1}`}
              style={{ cursor: 'pointer' }}
            >
              <span className="emoji">{key}</span>
              <span className="count">{value.length}</span>
            </Flex.Item>
          ))}
    </Flex>
  );
};
