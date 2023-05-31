import { database } from '@shared/firebase';
import { addDoc, setDoc, collection, doc } from 'firebase/firestore';
import { errorMessage } from '@shared/errorMessage';
import type { UserProfile } from '../types';

export const fetchUpdateUserProfile = async (profile: Omit<UserProfile, 'challenges' | 'note'>, uid?: string) => {
  const { email, name, photo, skills } = profile;
  try {
    const sendData = {
      name,
      email,
      photo,
      skills,
      note: null,
      challenges: []
    };
    return uid
      ? await setDoc(doc(database, 'user', uid), sendData)
      : await addDoc(collection(database, 'user'), sendData);
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
