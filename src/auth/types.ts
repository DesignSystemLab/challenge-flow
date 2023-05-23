import type { User } from 'firebase/auth';

export interface FormState {
  email: string;
  password: string;
  valid: boolean;
  message: string;
}

export interface ProfileState {
  name: string;
  skills?: string[];
  valid: boolean;
  message: string;
}

export interface EamilPasswordField {
  email: string;
  password: string;
}

export type UserType = User | null;
