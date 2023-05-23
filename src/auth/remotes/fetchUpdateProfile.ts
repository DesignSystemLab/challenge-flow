import { auth } from '@shared/firebase';
import { updateProfile } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

export const fetchUpdateProfile = async () => {
  try {
    //TODO
    // 1. updateProfile
    // 2. user/doc에 저장시키기
    // await updateProfile(auth, {});
  } catch (error) {
    const firebaseError = error as FirebaseError;
    const { code, message } = firebaseError;
    throw new Error(`errorCode: ${code}, errorMessage: ${message}`);
  }
};
