import type { User } from 'firebase/auth';

declare module 'next-auth' {
  interface Session {
    user: {
      uid: string;
      name: string | null;
      email: string | null;
      image: string | null;
    };
  }
}

export type AuthProvider = 'GOOGLE' | 'GITHUB';
export interface FormState {
  email: string;
  password: string;
  valid: boolean;
  message: string;
}

export interface EmailPasswordField {
  email: string;
  password: string;
}

export interface UserProfile {
  uid: string;
  name: string | null;
  email: string | null;
  photo: string | null;
  note: string | null;
  skills: string[];
  challenges: string[];
}

export interface UserSession {
  user: User;
  token: string;
}

export type UserType = User | null;
