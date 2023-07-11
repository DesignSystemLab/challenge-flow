export interface EmojiDataWithEmojiKey {
  [emoji: string]: Array<{
    createdAt: string;
    originId: string;
    emoji: string;
    userId: string;
    id: string;
  }>;
}
export interface EmojiFormData {
  originId: string;
  userId: string;
  emoji: string;
}

export interface EmojiDBData extends EmojiFormData {
  createdAt: string;
}
export interface EmojiDataWithId extends EmojiDBData {
  id: string;
}
