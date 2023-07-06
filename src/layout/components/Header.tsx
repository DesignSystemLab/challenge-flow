import DynamicWrapper from '@shared/components/DynamicWrapper';
import { ErrorModal } from '@shared/components/ErrorModal';
import { headerWrapper, headerContents, headerRight } from '@layout/styles/headerStyle';
import UserProfile from '@auth/components/UserProfile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ErrorBoundary } from 'react-error-boundary';

export const Header = () => {
  const router = useRouter();
  const moveToMain = () => {
    router.push('/');
  };

  const { data } = useSession();
  return (
    <header css={headerWrapper}>
      <nav css={headerContents}>
        <Image src="/images/logo.png" onClick={moveToMain} width={200} height={76} style={{ cursor: 'pointer' }} />
        <div css={headerRight}>
          <DynamicWrapper>
            <ErrorBoundary FallbackComponent={ErrorModal}>
              {data?.user.uid}
              <UserProfile />
            </ErrorBoundary>
          </DynamicWrapper>
        </div>
      </nav>
    </header>
  );
};
