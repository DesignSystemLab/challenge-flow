import { EmojiDataWithEmojiKey, EmojiDataWithId } from '@reaction/types';

export const calculateEmojiCount = (data: EmojiDataWithId[]) => {
  const countObj = {} as EmojiDataWithEmojiKey;
  for (const eachEmojiData of data) {
    const emojiKey = eachEmojiData.emoji;
    if (countObj[emojiKey]) {
      countObj[emojiKey].push(eachEmojiData);
    } else {
      countObj[emojiKey] = [eachEmojiData];
    }
  }
  return countObj;
};
