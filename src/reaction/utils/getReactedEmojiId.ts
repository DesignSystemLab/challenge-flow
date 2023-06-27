import { EmojiDataWithId } from '@reaction/types';

export const getReactedEmojiId = (values: EmojiDataWithId[], userId: string | undefined) => {
  let reactedEmojiId = null;

  values.forEach((value) => {
    if (value.userId === userId) {
      reactedEmojiId = value.id;
    }
  });

  return reactedEmojiId;
};
