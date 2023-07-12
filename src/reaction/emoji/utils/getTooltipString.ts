import { EmojiDataWithId } from '../types/data';

interface UserData {
  email?: string;
  name?: string;
  photo?: string;
  skills?: string[] | number[];
  challenges?: [];
  note?: string;
  id: string;
}

export const getTooltipString = (userInfo: UserData | null, emoji: string, value: EmojiDataWithId[]) => {
  if (userInfo) {
    const str = userInfo?.name ?? '';
    if (value.length > 1) {
      str?.concat(`외 ${value.length - 1}명`);
    }
    return `${str}이(가) ${emoji}로 반응했습니다.`;
  }
  return '';
};
