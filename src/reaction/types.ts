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
