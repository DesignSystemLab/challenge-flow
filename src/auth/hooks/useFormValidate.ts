import { useState, useMemo, useCallback } from 'react';
import { FormState } from '../types';

export const useFormValidate = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleInputEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.currentTarget.value);
    },
    [email]
  );

  const handleInputPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.currentTarget.value);
    },
    [password]
  );

  const registry: FormState = useMemo(() => {
    const emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

    if (!email.length) {
      return {
        email,
        password,
        valid: false,
        message: '이메일을 입력해주세요.'
      };
    }

    if (!emailRegex.test(email)) {
      return {
        email,
        password,
        valid: false,
        message: '올바르지 않은 이메일 입니다.'
      };
    }

    if (password.length < 8) {
      return {
        email,
        password,
        valid: false,
        message: '비밀번호는 최소 8글자 이상으로 입력해주세요.'
      };
    }

    return {
      email,
      password,
      valid: true,
      message: 'success'
    };
  }, [email, password]);

  return { handleInputEmail, handleInputPassword, registry };
};
