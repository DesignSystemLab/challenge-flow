import { useEffect, useState } from 'react';
import { calculateEmojiCount } from '@reaction/emoji/utils/calculateEmojiCount';
import { EmojiChip } from './EmojiChip';
import { chipList } from '../styles/emojiStyle';
import { EmojiListProps } from '../types/componentProps';
import { EmojiDataWithEmojiKey, EmojiDataWithId } from '../types/data';

export const EmojiList = ({ emojiList }: EmojiListProps) => {
  const [emojiCount, setEmojiCount] = useState<EmojiDataWithEmojiKey>({});

  useEffect(() => {
    if (emojiList) {
      setEmojiCount(calculateEmojiCount(emojiList));
    }
  }, [emojiList]);

  return (
    <div css={chipList}>
      {emojiList &&
        Object.entries<EmojiDataWithId[]>(emojiCount)
          .sort()
          .map(([key, value]) => <EmojiChip emojiList={emojiList} emoji={key} value={value} />)}
    </div>
  );
};
