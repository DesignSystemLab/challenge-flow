export interface ChallengeFormStates {
  title: string;
  isDaily: boolean;
  // skill: number | null;
  content: string;
  // memberCapacity: number;
  dueAt: string;
  e_duration: string;
  s_duration: string;
  isPublic: boolean;
}

export interface ChallengeFormStatesWithId extends ChallengeFormStates {
  id: string;
}

export interface ChallengePostFields extends ChallengeFormStatesWithId {
  createdAt: string;
  members: string[] | [];
}

export interface CreateChallengeFormProps {
  id?: string;
}
