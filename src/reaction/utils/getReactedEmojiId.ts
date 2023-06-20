import { EmojiDataWithId } from '@reaction/types';

export const getReactedEmojiId = (values: EmojiDataWithId[], userId: string) => {
  let reactedEmojiId = null;
  for (const value of values) {
    if (value.userId === userId) {
      reactedEmojiId = value.id;
    }
  }
  return reactedEmojiId;
};
