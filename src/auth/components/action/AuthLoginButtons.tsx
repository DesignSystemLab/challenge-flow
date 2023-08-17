import { GitHubIcon, GoogleIcon, Loading } from '@shared/components/Icons';
import { useActor } from '@xstate/react';
import { Button, Flex } from '@jdesignlab/react';
import { Mail } from '@jdesignlab/react-icons';
import { useSigninWithProvider } from '../../hooks/useSigninWithProvider';
import type { SignMachineType } from '../../machines/signMachine';
import type { InterpreterFrom } from 'xstate';

interface Props {
  signMachine: InterpreterFrom<SignMachineType>;
}

export const AuthLoginButtons = (props: Props) => {
  const { signMachine } = props;
  const [, refSend] = useActor(signMachine);
  const { isLoading: loadingWithGitHubLogin, mutate: signinGithub } = useSigninWithProvider('GITHUB', refSend);
  const { isLoading: loadingWithGoogleLogin, mutate: signinGoogle } = useSigninWithProvider('GOOGLE', refSend);
  return (
    <Flex direction="column" gap="16px">
      <Button
        color="primary-500"
        variant="outline"
        icon={<Mail />}
        onClick={() => {
          refSend('EMAIL');
        }}
      >
        Email 계정으로 로그인
      </Button>
      <Button
        color="green-darken3"
        variant="outline"
        onClick={() => {
          signinGithub();
        }}
        disabled={loadingWithGitHubLogin}
        icon={loadingWithGitHubLogin ? <Loading /> : <GitHubIcon />}
      >
        GitHub 계정으로 로그인
      </Button>
      <Button
        color="lightBlue-darken1"
        variant="outline"
        disabled={loadingWithGoogleLogin}
        icon={loadingWithGoogleLogin ? <Loading /> : <GoogleIcon />}
        onClick={() => {
          signinGoogle();
        }}
      >
        Google 계정으로 로그인
      </Button>
    </Flex>
  );
};
