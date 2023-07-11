export interface CommentFormData {
  content: string;
  userId: string;
  originId: string;
}
export interface CommentDBData extends CommentFormData {
  createdAt: string;
  updatedAt?: string;
}
export interface CommentDataWithId extends CommentDBData {
  id: string;
}
