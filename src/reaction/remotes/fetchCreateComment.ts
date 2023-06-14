import { database } from '@shared/firebase';
import { formatDateTime, getDate } from '@shared/utils/date';
import { createOne, getDocRef } from '@shared/utils/firestore';
import { collection, doc } from 'firebase/firestore';
import { CommentFormValues } from '../types';

const REF_NAME = 'comment';
const CHALLENGE_REF_NAME = 'challenge';
const COLLECTION = collection(database, REF_NAME);

const fetchCreateComment = (props: CommentFormValues) => {
  const ref = doc(COLLECTION);

  const param = {
    content: props.content,
    userId: props.userId,
    // uerId: getDocRef('user', props.userId),
    originId: getDocRef(CHALLENGE_REF_NAME, props.originId),
    createdAt: formatDateTime(getDate())
  };
  return createOne(ref, param);
};
export default fetchCreateComment;
