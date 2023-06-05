import DynamicWrapper from '@shared/components/DynamicWrapper';
import { headerWrapper, headerContents, headerLogo, headerRight } from '@layout/styles/header-style';
import UserProfile from '@auth/components/UserProfile';
import { useRouter } from 'next/router';

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
            <UserProfile />
          </DynamicWrapper>
        </div>
      </nav>
    </header>
  );
};
