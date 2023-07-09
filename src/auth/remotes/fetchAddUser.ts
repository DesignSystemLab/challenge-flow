import { errorMessage } from '@shared/errorMessage';
import { FIREBASE_COLLECTIONS } from '@shared/constants';
import { database } from '@shared/firebase';
import { setDoc, doc } from 'firebase/firestore';
import type { AuthProvider, UserProfile } from '../types';

type ExtendsProvider = AuthProvider | 'none';
interface UpdateUser {
  provider: ExtendsProvider;
  userInfo: Partial<UserProfile>;
}

export const fetchAddUser = async (params: UpdateUser) => {
  try {
    const { user } = FIREBASE_COLLECTIONS;
    const { provider, userInfo } = params;
    const { uid, challenges = [], email = null, name = null, note = null, photo = null, skills = [] } = userInfo;
    if (uid) {
      const initialUserInfo = {
        challenges,
        email,
        name,
        note,
        photo,
        skills,
        provider
      };
      return await setDoc(doc(database, user, uid), initialUserInfo);
    }
    throw new Error('올바르지 않은 사용자 입니다.');
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
