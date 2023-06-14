import { database } from '@shared/firebase';
import { getList, getDocRef } from '@shared/utils/firestore';
import { collection, orderBy, query, where } from 'firebase/firestore';

const REF_NAME = 'comment';
const CHALLENGE_REF_NAME = 'challenge';
const COLLECTION = collection(database, REF_NAME);

const fetchReadCommentList = async ({ originId }: { originId: string }) => {
  const q = query(
    COLLECTION,
    where('originId', '==', getDocRef(CHALLENGE_REF_NAME, originId)),
    orderBy('createdAt', 'desc')
  );
  return getList(q);
};
export default fetchReadCommentList;
