import type { User } from 'firebase/auth';

export type AuthProvider = 'GOOGLE' | 'GITHUB';
export interface FormState {
  email: string;
  password: string;
  valid: boolean;
  message: string;
}

export interface EamilPasswordField {
  email: string;
  password: string;
}

export interface UserProfile {
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
