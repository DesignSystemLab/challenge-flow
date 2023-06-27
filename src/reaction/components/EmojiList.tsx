import { useContext, useEffect, useState } from 'react';
import { calculateEmojiCount } from '@reaction/utils/calculateEmojiCount';
import { getReactedEmojiId } from '@reaction/utils/getReactedEmojiId';
import { Chip } from '@shared/components/dataDisplay/Chip';
import { useQuery } from 'react-query';
import { useCreateEmoji } from '../hooks/useCreateEmoji';
import { useDeleteEmoji } from '../hooks/useDeleteEmoji';
import { ReactionContext } from '../context';
import fetchReadEmojiList from '../remotes/fetchReadEmojiList';
import { EmojiDataWithEmojiKey, EmojiDataWithId } from '../types';

export const EmojiList = ({ userId }: { userId: string | undefined }) => {
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
    <div css={{ display: 'flex', gap: '4px', marginLeft: '16px' }}>
      {data &&
        data.length > 0 &&
        Object.entries<EmojiDataWithId[]>(emojiCount)
          .sort()
          .map(([key, value]) => (
            <Chip as="button" onClick={() => toggleEmoji(key, value)} bordered size="md" key={key}>
              <span className="emoji" css={{ fontSize: '16px', marginRight: '4px' }}>
                {key}
              </span>
              <span className="count" css={{ color: 'black' }}>
                {value.length}
              </span>
            </Chip>
          ))}
    </div>
  );
};
