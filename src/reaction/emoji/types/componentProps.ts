import { EmojiDataWithId } from './data';

export interface EmojiAddPopupProps {
  emojiList: EmojiDataWithId[] | undefined;
}

export interface EmojiChipProps {
  emojiList: EmojiDataWithId[] | undefined;
  emoji: string;
  value: EmojiDataWithId[];
}

export interface EmojiListProps {
  emojiList: EmojiDataWithId[] | undefined;
}
