import { useEffect, useState } from 'react';
// import { UserData } from '@challenge/types';
import { getUserInfo } from '@shared/utils/firestore';

interface UserFetchData {
  email?: string;
  name?: string;
  photo?: string;
  skills?: string[] | number[];
  challenges?: [];
  note?: string;
}

export const useGetUserInfoById = (userId: string) => {
  const [userInfo, setUserInfo] = useState<UserFetchData | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      const data = await getUserInfo(userId);
      setUserInfo(data);
    }
    fetchUserData();
  }, [userId]);

  return { userInfo };
};
