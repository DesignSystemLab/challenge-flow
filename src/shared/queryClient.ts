import { QueryClient } from 'react-query';
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { FirebaseError } from 'firebase/app';

const cacheTime = 1000 * 60 * 60 * 24 * 5;
const errorHandler = (error: unknown) => {
  if (error instanceof FirebaseError) {
    const firebaseError = error as FirebaseError;
    const { code = 'NotFound', message = '알 수 없는 오류입니다.' } = firebaseError;
  }
  if (error instanceof Error) {
  }
};

// const localStoragePersistor = createWebStoragePersistor({
//   storage: window.localStorage
// });

// to satisfy typescript until this file has uncommented contents
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      onError: errorHandler
    },
    mutations: {
      onError: errorHandler
    }
  }
});

// persistQueryClient({
//   queryClient,
//   persistor: localStoragePersistor,
//   maxAge: cacheTime
// });
