import { database } from '@shared/firebase';
import { moveDoc } from '@shared/utils/firestore';
import { doc } from 'firebase/firestore';

const REF_NAME = 'comment';
const DELETED_REF_NAME = 'comment';

const fetchDeleteComment = (commentId: string) => {
  const targetRef = doc(database, REF_NAME, commentId);
  const destRef = doc(database, DELETED_REF_NAME, commentId);
  return moveDoc(targetRef, destRef);
};
export default fetchDeleteComment;
