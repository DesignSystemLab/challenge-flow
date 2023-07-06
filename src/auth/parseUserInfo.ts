import type { User } from 'firebase/auth';
import type { UserProfile } from './types';

type OmitFields = 'challenges' | 'note' | 'uid';
export const parseUserInfo = (user: User | null): Omit<UserProfile, OmitFields> => {
  const userInfo: Omit<UserProfile, OmitFields> = {
    name: null,
    email: null,
    photo: null,
    skills: []
  };
  if (user && user.providerData[0]) {
    const { displayName: name, photoURL: photo, email } = user.providerData[0];
    return Object.assign(userInfo, { name, photo, email });
  }
  return userInfo;
};
