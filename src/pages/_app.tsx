import { ThemeProvider } from '@jdesignlab/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from '@shared/contexts/AuthContext';
import { AuthMachineContext } from '@shared/contexts/AuthMachineContext';
import type { AppProps } from 'next/app';

const ChallengeFlow = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {/* <AuthProvider> */}
      <AuthMachineContext.Provider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthMachineContext.Provider>
      {/* </AuthProvider> */}
    </QueryClientProvider>
  );
};

export default ChallengeFlow;
