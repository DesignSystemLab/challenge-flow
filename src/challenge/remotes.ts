import { database } from '@shared/firebase';
import { formatDateTime, getDate } from '@shared/utils/date';
import { createOne, getList, getOne, moveDoc, addDataInArrayField, upsertDoc } from '@shared/utils/firestore';
import { FIREBASE_COLLECTIONS } from '@shared/constants';
import { collection, doc, orderBy, query } from 'firebase/firestore';
import { ChallengeAllFormValues } from './types';

const REF_NAME = 'challenge';
const DELETED_REF_NAME = FIREBASE_COLLECTIONS.deletedChallenge;
const COLLECTION = collection(database, REF_NAME);

async function create(postValue: ChallengeAllFormValues) {
  const ref = doc(collection(database, REF_NAME));
  const param = {
    ...postValue,
    members: [],
    createdAt: formatDateTime(getDate())
  };
  return createOne(ref, param);
}

async function getPostList() {
  const q = query(COLLECTION, orderBy('createdAt', 'desc'));
  const data = await getList(q);
  return data;
}

async function getPostDetail(postId: string) {
  const docRef = doc(database, REF_NAME, postId);
  return getOne(docRef);
}

export const applyPost = async (postId: string, userId: string) => {
  const docRef = doc(database, REF_NAME, postId);
  return addDataInArrayField(docRef, 'members', userId);
};

async function deleteOne(postId: string) {
  const targetRef = doc(database, REF_NAME, postId);
  const destRef = doc(database, DELETED_REF_NAME, postId);
  return moveDoc(targetRef, destRef);
}

async function modifyPost(postId: string, postValue: ChallengeAllFormValues) {
  const docRef = doc(database, REF_NAME, postId);
  const param = {
    ...postValue,
    updatedAt: formatDateTime(getDate())
  };
  return upsertDoc(docRef, param);
}

export const ChallengeAPI = {
  getPostList,
  create,
  getPostDetail,
  applyPost,
  deleteOne,
  modifyPost
};
