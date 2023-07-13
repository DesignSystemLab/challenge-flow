import { database } from '@shared/firebase';
import { formatDateTime, getDate } from '@shared/utils/date';
import {
  DocumentData,
  DocumentReference,
  Query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore';

const addIdToData = async (dataDoc: QueryDocumentSnapshot<DocumentData>) =>
  ({
    ...dataDoc.data(),
    userId: dataDoc.data().userId.id,
    id: dataDoc.id
  } as any);

export const parseSnapshotToList = (querySnapshot: QuerySnapshot<DocumentData>) => {
  const data = Array.from(querySnapshot.docs, addIdToData);
  return data;
};

export const getDocRef = (collection: string, id: string) => doc(database, `${collection}/${id}`);

export const createOne = async (ref: DocumentReference<DocumentData>, data: any) => {
  await setDoc(ref, data);
};

export const getList = async (query: Query<DocumentData>) => {
  const querySnapshot = await getDocs(query);
  const data = parseSnapshotToList(querySnapshot);
  return data;
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

export const getUserInfo = async (userId: string) => {
  const ref = getDocRef('user', userId);
  const snapshot = await getDoc(ref);
  if (snapshot.exists()) {
    return { ...snapshot.data(), id: userId } as any;
  }
  return null;
};

export const getCommentCount = async (postId: string, domain: string) => {
  const REF_NAME = 'comment';
  const COLLECTION = collection(database, REF_NAME);
  const q = query(
    COLLECTION,
    where('originId', '==', getDocRef(domain as string, postId as string)),
    orderBy('createdAt', 'desc')
  );
  const { docs } = await getDocs(q);
  return docs.length;
};
