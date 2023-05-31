export const getLocalStorageItem = <T>(key: string): T | null => {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item) as T;
      } catch (error) {
        console.error(`${key} 파싱에 실패하였습니다. Error: ${error}`);
        return null;
      }
    }
    return null;
  }

  return null;
};
