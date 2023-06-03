import { ChallengePostFields } from '@challenge/types';
import { formatDateTime, getDate } from '@shared/utils/date';
import {
  DocumentData,
  DocumentReference,
  Query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  deleteDoc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc
} from 'firebase/firestore';

const addIdToData = (doc: QueryDocumentSnapshot<DocumentData>) =>
  ({
    ...doc.data(),
    id: doc.id
  } as ChallengePostFields);

const parseSnapshotToList = (querySnapshot: QuerySnapshot<DocumentData>) => Array.from(querySnapshot.docs, addIdToData);

export const createOne = async (ref: DocumentReference<DocumentData>, data: any) => {
  await setDoc(ref, data);
};

export const getList = async (query: Query<DocumentData>) => {
  const querySnapshot = await getDocs(query);
  return parseSnapshotToList(querySnapshot);
};

export const getOne = async (ref: DocumentReference<DocumentData>) => {
  const docSnapshot = await getDoc(ref);
  if (docSnapshot.exists()) {
    return addIdToData(docSnapshot);
  }
  throw new Error('해당 게시물이 존재하지 않습니다.');
};

export const addDataInArrayField = async (ref: DocumentReference<DocumentData>, field: string, data: string) => {
  const docSnapshot = await getDoc(ref);
  if (docSnapshot.exists()) {
    const currentArray = docSnapshot.data()[field];
    const updatedArray = [...currentArray, data];
    await updateDoc(ref, {
      members: updatedArray
    });
  } else {
    throw new Error('해당 게시물이 존재하지 않습니다.');
  }
};

export const moveDoc = async (
  targetRef: DocumentReference<DocumentData>,
  destinationRef: DocumentReference<DocumentData>
) => {
  const docSnapshot = await getDoc(targetRef);
  if (docSnapshot.exists()) {
    const data = { ...docSnapshot.data(), deletedAt: formatDateTime(getDate()) };
    setDoc(destinationRef, data).then(() => {
      deleteDoc(targetRef);
    });
  } else {
    throw new Error('해당 게시물이 존재하지 않습니다.');
  }
};

export const upsertDoc = async (ref: DocumentReference<DocumentData>, newData: any) => {
  const docSnapshot = await getDoc(ref);
  if (docSnapshot.exists()) {
    await updateDoc(ref, newData);
  } else {
    throw new Error('해당 게시물이 존재하지 않습니다.');
  }
};
