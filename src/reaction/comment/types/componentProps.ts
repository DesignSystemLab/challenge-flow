import { CommentDataWithId } from './data';

export interface EachCommentProps {
  data: CommentDataWithId;
  editModeId: string | null;
  setEditModeId: React.Dispatch<React.SetStateAction<string | null>>;
}
