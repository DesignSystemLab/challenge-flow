import { database } from '@shared/firebase';
import { formatDateTime, getDate } from '@shared/utils/date';
import { upsertDoc } from '@shared/utils/firestore';
import { doc } from 'firebase/firestore';

const REF_NAME = 'comment';

const fetchUpdateComment = ({ id, content }: { id: string; content: string }) => {
  const docRef = doc(database, REF_NAME, id);
  const param = {
    content,
    updatedAt: formatDateTime(getDate())
  };
  return upsertDoc(docRef, param);
};
export default fetchUpdateComment;
