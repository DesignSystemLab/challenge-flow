export interface ChallengePostFields {
  id: number;
  title: string;
  isDaily: boolean;
  skill: number;
  content: string;
  isDeleted: boolean;
  createdAt: string;
  memberCapacity: number;
}

export interface ChallengeFormStates {
  title: string;
  isDaily: boolean;
  skill: number | null;
  content: string;
  [key: string]: string | boolean | number | null;
}

export interface CreateChallengeFormProps {
  id?: string;
}
