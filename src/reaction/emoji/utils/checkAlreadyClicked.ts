import { EmojiDataWithId } from '@reaction/types';

export const checkAlreadyClicked = (
  currentUId: string | undefined,
  emojiList: EmojiDataWithId[] | undefined,
  emoji: string
) => {
  let disabled = false;
  emojiList?.forEach((data: EmojiDataWithId) => {
    if (data.userId === currentUId && data.emoji === emoji) {
      disabled = true;
    }
  });
  return disabled;
};
