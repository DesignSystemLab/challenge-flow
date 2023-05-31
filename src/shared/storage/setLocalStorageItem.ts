export const setLocalStorageItem = <T>(key: string, value: T): void => {
  if (typeof window !== 'undefined') {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      const errorMessage = `${key} 저장에 실패하였습니다. Error: ${error}`;
      console.error(errorMessage);
      new Error(errorMessage);
    }
  }
};
