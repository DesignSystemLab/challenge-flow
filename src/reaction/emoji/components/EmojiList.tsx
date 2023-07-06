import { useContext, useEffect, useState } from 'react';
import { calculateEmojiCount } from '@reaction/utils/calculateEmojiCount';
import { getReactedEmojiId } from '@reaction/utils/getReactedEmojiId';
import { useDeleteEmoji } from '@reaction/hooks/useDeleteEmoji';
import { Chip } from '@shared/components/dataDisplay/Chip';
import { EmojiDataWithEmojiKey, EmojiDataWithId } from '@reaction/types';
import { ReactionContext } from '@reaction/context';
import fetchReadEmojiList from '@reaction/remotes/fetchReadEmojiList';
import { useCreateEmoji } from '@reaction/hooks/useCreateEmoji';
import { useQuery } from 'react-query';

export const EmojiList = ({
  currentUser
}: {
  currentUser: {
    uid: string;
    email?: string;
    name?: string;
    image?: string;
  };
}) => {
  const { originId } = useContext(ReactionContext);
  const { data } = useQuery(`emoji-${originId}`, () => fetchReadEmojiList({ originId }));
  const { onSubmit } = useCreateEmoji(originId, currentUser.uid);
  const { onDelete } = useDeleteEmoji(originId);
  const [emojiCount, setEmojiCount] = useState<EmojiDataWithEmojiKey>({});

  useEffect(() => {
    if (data) {
      setEmojiCount(calculateEmojiCount(data));
    }
  }, [data]);

  const toggleEmoji = (emojiKey: string, values: EmojiDataWithId[]) => {
    const reactedEmojiId = getReactedEmojiId(values, currentUser.uid);
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
            <Chip as="button" onClick={() => toggleEmoji(key, value)} color="#e1" size="md" key={key}>
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
