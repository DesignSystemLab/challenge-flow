import { useEffect, useState } from 'react';
import { getUserInfo } from '@shared/utils/firestore';

interface UserFetchData {
  email?: string;
  name?: string;
  photo?: string;
  skills?: string[] | number[];
  challenges?: [];
  note?: string;
  id: string;
}

export const useGetUserInfoById = (userId: string | undefined) => {
  const [userInfo, setUserInfo] = useState<UserFetchData | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      if (userId) {
        const data = await getUserInfo(userId);
        setUserInfo(data);
      }
    }
    fetchUserData();
  }, [userId]);

  return { userInfo };
};
