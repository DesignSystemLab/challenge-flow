import { useUserAuth } from '@auth/hooks/useUserAuth';
import { useSignout } from '@auth/hooks/useSignout';
import { Button } from '@jdesignlab/react';
import { SigninModal } from './SigninModal';
import { SignupModal } from './SignupModal';

const UserProfile = () => {
  const { data: user } = useUserAuth();
  const { mutate: signout } = useSignout();

  return (
    <div>
      {user && (
        <Button
          onClick={() => {
            signout();
          }}
        >
          로그아웃
        </Button>
      )}
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
