import { FirebaseError } from 'firebase/app';
import { CustomFirebaseError } from './constants';

export const errorMessage = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    const firebaseError = error as FirebaseError;
    const { code } = firebaseError;
    return `errorCode: ${code} \n errorMessage: ${CustomFirebaseError[code]}`;
  }

  if (error instanceof Error) {
    Object.prototype.hasOwnProperty.call(error, 'code');
    return error.message;
  }

  return '알 수 없는 오류입니다.';
};
