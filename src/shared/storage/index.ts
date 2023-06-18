export { STORAGE_KEYS } from './storageKeys';

export const getLocalStorageItem = <T>(key: string): T | null => {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item) as T;
      } catch (error) {
        const errorMessage = `${key} 조회에 실패하였습니다. Error: ${error}`;
        (() => new Error(errorMessage))();
      }
    }
    return null;
  }

  return null;
};

export const setLocalStorageItem = <T>(key: string, value: T): void => {
  if (typeof window !== 'undefined') {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      const errorMessage = `${key} 저장에 실패하였습니다. Error: ${error}`;
      (() => new Error(errorMessage))();
    }
  }
};

export const clearLocalStorageItem = (key: string): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      const errorMessage = `${key} 저장에 실패하였습니다. Error: ${error}`;
      (() => new Error(errorMessage))();
    }
  }
};
