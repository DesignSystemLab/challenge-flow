import { EmojiDataWithEmojiKey, EmojiDataWithId } from '../types/data';

export const calculateEmojiCount = (data: EmojiDataWithId[]) => {
  const countObj = {} as EmojiDataWithEmojiKey;

  data.forEach((eachEmojiData) => {
    const emojiKey = eachEmojiData.emoji;
    if (countObj[emojiKey]) {
      countObj[emojiKey].push(eachEmojiData);
    } else {
      countObj[emojiKey] = [eachEmojiData];
    }
  });
  return countObj;
};
