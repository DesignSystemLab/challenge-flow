import { FieldValues } from 'react-hook-form';

export interface CommentFormValues {
  content: string;
  userId: string;
  originId: string;
}

export interface CommentFields extends CommentFormValues {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

export interface EachCommentProps {
  data: CommentFields;
  onUpdateComment: (formValues: FieldValues, commentId: string) => void;
  editMode: string | null;
  setEditMode: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface CreateMutationParam {
  emojiValue: string;
  originId: string;
  userId: string;
}

export interface EmojiDataWithEmojiKey {
  [emoji: string]: Array<{
    createdAt: string;
    originId: string;
    emoji: string;
    userId: string;
    id: string;
  }>;
}

export interface EmojiData {
  createdAt: string;
  originId: string;
  userId: string;
  emoji: string;
}
export interface EmojiDataWithId extends EmojiData {
  id: string;
}
