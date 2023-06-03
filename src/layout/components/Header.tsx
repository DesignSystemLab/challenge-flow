import { headerWrapper, headerContents, headerLogo, headerRight } from '@layout/styles/header-style';
import { useRouter } from 'next/router';
import { Button } from '@jdesignlab/react';

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
          <Button color="primary-500">회원가입</Button>
          <Button variant="outline" color="primary-500">
            로그인
          </Button>
        </div>
      </nav>
    </header>
  );
};
