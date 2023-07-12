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

export const useMemberAvatars = (members: string[]) => {
  const [memberAvatars, setMemberAvatars] = useState<string[]>([]);
  useEffect(() => {
    async function getMemberAvatarImages() {
      const promiseArray = members.map((member: string) => getUserInfo(member));
      const memberInfos = await Promise.all(promiseArray);
      const photos = memberInfos.map((memberInfo: UserFetchData) => memberInfo?.photo ?? '');
      setMemberAvatars(photos);
    }
    getMemberAvatarImages();
  }, [members]);
  return memberAvatars;
};
