import { useSignout } from '@auth/hooks/useSignout';
import { Button } from '@jdesignlab/react';
import { useSession } from 'next-auth/react';
import { SigninModal } from './SigninModal';
import { SignupModal } from './SignupModal';

const UserProfile = () => {
  const { data } = useSession();
  const user = data?.user;
  const { mutate: signout } = useSignout();

  return (
    <div>
      {user ? (
        <Button
          onClick={() => {
            signout();
          }}
        >
          로그아웃
        </Button>
      ) : (
        <>
          <SigninModal />
          <SignupModal />
        </>
      )}
    </div>
  );
};
export default UserProfile;
