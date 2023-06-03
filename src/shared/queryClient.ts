import { QueryClient } from 'react-query';
// import { FirebaseError } from 'firebase/app';

// const errorHandler = (error: unknown) => {
//   if (error instanceof FirebaseError) {
//     const firebaseError = error as FirebaseError;
//     const { code = 'NotFound', message = '알 수 없는 오류입니다.' } = firebaseError;
//   }
//   if (error instanceof Error) {
//   }
// };

// const localStoragePersistor = createWebStoragePersistor({
//   storage: window.localStorage
// });

// to satisfy typescript until this file has uncommented contents
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true
    },
    mutations: {}
  }
});

// persistQueryClient({
//   queryClient,
//   persistor: localStoragePersistor,
//   maxAge: cacheTime
// });
