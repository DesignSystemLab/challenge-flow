import { CompositionBoundaryReactQuery } from '@shared/boundaries/components/CompositionBoundaryReactQuery';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../../shared/queryClient';
import UserProfile from '../components/UserProfile';

const SignHeader = () => (
  <QueryClientProvider client={queryClient}>
    <CompositionBoundaryReactQuery suspense={<h2>logding..</h2>} error={(props) => <div {...props}>error</div>}>
      <UserProfile />
    </CompositionBoundaryReactQuery>
  </QueryClientProvider>
);

describe('Signin', () => {
  it('로그인을 진행하지 않을 때 로그인 버튼과 회원가입 버튼이 표시된다.', () => {
    render(<SignHeader />);
    const signButtons = screen.getAllByRole('button');
    expect(signButtons.length).toEqual(2);
    expect(signButtons[0]).toHaveTextContent('로그인');
    expect(signButtons[1]).toHaveTextContent('회원가입');
  });

  it('로그인 버튼을 클릭하면 로그인 모달이 표시된다.', async () => {
    render(<SignHeader />);
    const loginButton = screen.getAllByRole('button')[0];
    await userEvent.click(loginButton);
    const signinModal = screen.getByRole('dialog');

    const loginButtons = signinModal.querySelectorAll('button');

    expect(signinModal).toBeInTheDocument();
    expect(loginButtons.length).toEqual(3);
  });

  it('"Email 로그인" 버튼을 클릭하면 로그인 폼이 표시된다.', async () => {
    render(<SignHeader />);
    const loginButton = screen.getAllByRole('button')[0];
    await userEvent.click(loginButton);
    const signinModal = screen.getByRole('dialog');
    const emailLoginButton = signinModal.querySelectorAll('button')[0];
    expect(signinModal).toBeInTheDocument();
    expect(emailLoginButton).toHaveTextContent('Email로 로그인');
    await userEvent.click(emailLoginButton);
    const loginForm = screen.getByRole('dialog').querySelector('form');
    const FieildList = loginForm?.querySelectorAll('input');
    expect(loginForm).toBeInTheDocument();
    expect(FieildList?.length).toEqual(2);
  });

  it('"Email 로그인" 버튼을 클릭하면 로그인 폼이 표시된다.', async () => {
    render(<SignHeader />);
    const loginButton = screen.getAllByRole('button')[0];
    await userEvent.click(loginButton);
    const signinModal = screen.getByRole('dialog');
    const emailLoginButton = signinModal.querySelectorAll('button')[0];
    expect(signinModal).toBeInTheDocument();
    expect(emailLoginButton).toHaveTextContent('Email로 로그인');
    await userEvent.click(emailLoginButton);
    const loginForm = screen.getByRole('dialog').querySelector('form');
    const FieildList = loginForm?.querySelectorAll('input');
    expect(loginForm).toBeInTheDocument();
    expect(FieildList?.length).toEqual(2);
  });

  it('이메일 필드는 이메일 양식에 맞게 입력해야한다.', async () => {
    render(<SignHeader />);
    const loginButton = screen.getAllByRole('button')[0];
    await userEvent.click(loginButton);
    const signinModal = screen.getByRole('dialog');
    const emailLoginButton = signinModal.querySelectorAll('button')[0];
    await userEvent.click(emailLoginButton);
    const submitButton = screen.getByRole('dialog').querySelectorAll('button')[1];
    const emailField = screen.getByRole('dialog').querySelectorAll('input')[0];
    await userEvent.type(emailField, 'test14');
    await userEvent.click(submitButton);
    const errorMessage = screen.getByText('이메일 형식에 맞지 않습니다.');
    expect(errorMessage).toBeInTheDocument();
    await userEvent.type(emailField, 'admin@test.co.kr');
    await userEvent.click(submitButton);
    expect(errorMessage).not.toBeInTheDocument();
  });

  it('비밀번호 필드는 최소 8자리 이상 입력해야한다.', async () => {
    render(<SignHeader />);
    const loginButton = screen.getAllByRole('button')[0];
    await userEvent.click(loginButton);
    const signinModal = screen.getByRole('dialog');
    const emailLoginButton = signinModal.querySelectorAll('button')[0];
    await userEvent.click(emailLoginButton);
    const submitButton = screen.getByRole('dialog').querySelectorAll('button')[1];
    const passwordField = screen.getByRole('dialog').querySelectorAll('input')[1];
    await userEvent.type(passwordField, '123456');
    await userEvent.click(submitButton);
    const errorMessage = screen.getByText('비밀번호는 최소 8자 이상으로 입력해주세요.');
    expect(errorMessage).toBeInTheDocument();
    await userEvent.type(passwordField, 'admin@test.co.kr');
    await userEvent.click(submitButton);
    expect(errorMessage).not.toBeInTheDocument();
  });
});
