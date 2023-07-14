import { fetchUserInfo } from '@auth/remotes/fetchUserInfo';
import { UserProfile } from '@auth/types';
import { Avatar } from '@shared/components/dataDisplay/Avatar';
import { profileStyle, profileWrapperStyle } from '@auth/styles/Profile';
import { Card, Flex, Text } from '@jdesignlab/react';
import type { GetServerSideProps } from 'next';

interface Props {
  userInfo?: UserProfile;
}
const ProfilePage = (props: Props) => {
  const { userInfo } = props;

  return (
    <div css={profileWrapperStyle}>
      <Card size="lg" variant="outlined">
        <Card.Header>
          <Text size="lg" variant="heading">
            사용자 정보
          </Text>
        </Card.Header>
        <Card.Divider />
        <Card.Body>
          <Flex items="center" gap={16}>
            <Avatar size="lg" src={userInfo?.photo ?? ''} />
            <Text size="lg">{userInfo?.name ?? userInfo?.email}</Text>
          </Flex>
        </Card.Body>
        <Card.Divider />
        <Card.Footer>
          <dl css={profileStyle}>
            <dt>
              <Text variant="heading" color="primary-500">
                이메일
              </Text>
            </dt>
            <dd>
              <Text variant="label">{userInfo?.email ?? 'anonymous'}</Text>
            </dd>
            <dt>
              <Text variant="heading" color="primary-500">
                상태
              </Text>
            </dt>
            <dd>
              <Text variant="label">{userInfo?.note ?? 'anonymous'}</Text>
            </dd>
          </dl>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid = context.query.user;
  if (!uid || typeof uid !== 'string') {
    return {
      redirect: {
        destination: '/500',
        permanent: false
      }
    };
  }
  const userInfo = await fetchUserInfo(uid);

  if (!userInfo) {
    return {
      redirect: {
        destination: '/404',
        permanent: false
      }
    };
  }

  return { props: { userInfo } };
};
