import { errorMessage } from '@shared/errorMessage';
import { FIREBASE_COLLECTIONS } from '@shared/constants';
import { database } from '@shared/firebase';
import { setDoc, doc } from 'firebase/firestore';
import type { AuthProvider, UserProfile } from '../types';

type ExtendsProvider = AuthProvider | 'none';
interface UpdateUser {
  provider: ExtendsProvider;
  userInfo: Partial<Omit<UserProfile, 'photo'> & { picture: string }>;
}

export const fetchAddUser = async (params: UpdateUser) => {
  try {
    const { user } = FIREBASE_COLLECTIONS;
    const { provider, userInfo } = params;
    const { uid, challenges = [], email = null, name = null, note = null, picture = null, skills = [] } = userInfo;
    if (uid) {
      const sendUser = {
        challenges,
        email,
        name,
        note,
        picture,
        skills,
        provider
      };
      return await setDoc(doc(database, user, uid), sendUser);
    }
    throw new Error('올바르지 않은 사용자 입니다.');
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
