import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { errorMessage } from '../errorMessage';

export const fetchUploadImage = async (uid: string, file: File | null) => {
  try {
    if (file) {
      const storageRef = ref(storage, uid);
      const { ref: imageRef } = await uploadBytes(storageRef, file);
      return await getDownloadURL(imageRef);
    }
    throw new Error('올바르지 않은 파일 입니다.');
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
