import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where
} from 'firebase/firestore';
import { database } from '@shared/firebase';
import { format } from 'date-fns';
import { ChallengeFormStates, ChallengePostFields } from './types';

const REF_NAME = 'challenge';
const COLLECTION = collection(database, REF_NAME);

export const ChallengeAPI = {
  getList,
  create
};

async function getList() {
  const q = query(COLLECTION, where('isDeleted', '==', false));
  const querySnapshot = await getDocs(q);
  const data: DocumentData = [];
  querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
    data.push(doc.data());
  });
  return data as ChallengePostFields[] | [];
}

async function create(id: string, postValue: ChallengeFormStates) {
  const param = {
    ...postValue,
    id,
    isDeleted: false,
    createdAt: getCurrentTime()
  };
  await setDoc(doc(database, REF_NAME, id), param);
}

function getCurrentTime() {
  const currentTime = new Date();
  const formattedTime = format(currentTime, 'yyyy-MM-dd HH:mm:ss');
  return formattedTime;
}
