import { useUserAuth } from '@auth/hooks/useUserAuth';
import { Button } from '@jdesignlab/react';
import { SigninModal } from './SigninModal';
import { SignupModal } from './SignupModal';

const UserProfile = () => {
  const { data: user } = useUserAuth();

  return (
    <div>
      {user && <Button onClick={() => {}}>로그아웃</Button>}
      {!user && (
        <>
          <SigninModal />
          <SignupModal />
        </>
      )}
    </div>
  );
};
export default UserProfile;
