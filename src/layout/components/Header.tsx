import { useSignout } from '@auth/hooks/useSignout';
import { SigninModal } from '@auth/components/SigninModal';
import { SignupModal } from '@auth/components/SignupModal';
import { ErrorModal } from '@shared/components/ErrorModal';
import { Layout } from '@shared/components/dataDisplay/FlexLayout';
import { headerWrapper, headerContents } from '@layout/styles/headerStyle';
import { useGetUserInfoById } from '@challenge/hooks/useGetUserInfoById';
import { Avatar } from '@shared/components/dataDisplay/Avatar';
import { Loading } from '@shared/components/Icons/Loading';
import { CompositionBoundaryReactQuery } from '@shared/boundaries';
import { Dropdown, Text } from '@jdesignlab/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export const Header = () => {
  const router = useRouter();
  const moveToMain = () => {
    router.push('/');
  };
  const { data } = useSession();
  const { userInfo } = useGetUserInfoById(data?.user?.uid);
  const { mutate: signout } = useSignout();

  return (
    <header css={headerWrapper}>
      <nav css={headerContents}>
        <Image src="/images/logo.png" onClick={moveToMain} width={200} height={76} style={{ cursor: 'pointer' }} />
        <CompositionBoundaryReactQuery suspense={<Loading />} error={(props) => <ErrorModal {...props} />}>
          {userInfo ? (
            <Dropdown>
              <Dropdown.Trigger>
                <Avatar src={userInfo.photo} size="lg" />
              </Dropdown.Trigger>
              <Dropdown.Menu>
                <Dropdown.MenuItem>
                  <Layout.Column>
                    <Text variant="label" size="md" truncate>
                      {userInfo.name}
                    </Text>
                    <Text variant="label" size="sm">
                      {userInfo.email}
                    </Text>
                    <Text variant="paragraph" size="sm" truncate style={{ width: '200px' }}>
                      {userInfo.note}
                    </Text>
                  </Layout.Column>
                </Dropdown.MenuItem>
                <Dropdown.Divider />
                <Dropdown.MenuItem>
                  <Link href={`/mypage/${userInfo.id}`}>마이페이지</Link>
                </Dropdown.MenuItem>
                <Dropdown.Divider />
                <Dropdown.MenuItem onClick={() => signout()}>
                  <Text variant="paragraph" color="error">
                    로그아웃
                  </Text>
                </Dropdown.MenuItem>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Layout.Row gap={4}>
              <SigninModal />
              <SignupModal />
            </Layout.Row>
          )}
        </CompositionBoundaryReactQuery>
      </nav>
    </header>
  );
};
