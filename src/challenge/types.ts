interface Duration {
  start: string;
  end: string;
}
export interface ChallengeFormStates {
  title: string;
  isDaily: boolean;
  skill: number | null;
  content: string;
  memberCapacity: number;
  duration: Duration;
  dueAt: string;
  // [key: string]: string | string[] | boolean | number | null | { start: string | null; end: string | null };
  [key: string]: any;
}

export interface ChallengePostFields extends ChallengeFormStates {
  id: string;
  createdAt: string;
  members: string[] | [];
}

export interface CreateChallengeFormProps {
  id?: string;
}
