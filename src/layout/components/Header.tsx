import DynamicWrapper from '@shared/components/DynamicWrapper';
import { ErrorModal } from '@shared/components/ErrorModal';
import { headerWrapper, headerContents, headerLogo, headerRight } from '@layout/styles/headerStyle';
import UserProfile from '@auth/components/UserProfile';
import { useRouter } from 'next/router';
import { ErrorBoundary } from 'react-error-boundary';

export const Header = () => {
  const router = useRouter();
  const moveToMain = () => {
    router.push('/');
  };

  return (
    <header css={headerWrapper}>
      <nav css={headerContents}>
        <div onClick={moveToMain} css={headerLogo} aria-hidden="true">
          Challenge Flow
        </div>
        <div css={headerRight}>
          <DynamicWrapper>
            <ErrorBoundary FallbackComponent={ErrorModal}>
              <UserProfile />
            </ErrorBoundary>
          </DynamicWrapper>
        </div>
      </nav>
    </header>
  );
};
