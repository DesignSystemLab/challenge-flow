import { FirebaseError } from 'firebase/app';

export const errorMessage = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    const firebaseError = error as FirebaseError;
    const { code, message } = firebaseError;
    return `errorCode: ${code}\nerrorMessage: ${message}`;
  }

  if (error instanceof Error) {
    error.hasOwnProperty('code');
    return error.message;
  }

  return '알 수 없는 오류입니다.';
};
