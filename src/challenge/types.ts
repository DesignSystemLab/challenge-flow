export interface ChallengeHookFormValues {
  title: string;
  isDaily: boolean;
  dueAt: string;
  duration: {
    start: string;
    end: string;
  };
  isPublic: boolean;
}
export interface ChallengeAllFormValues extends ChallengeHookFormValues {
  memberCapacity: number;
  content: string;
  skill: number;
}

export interface ChallengeFormValuesWithUserId extends ChallengeAllFormValues {
  userId: string;
}

export interface ChallengeFormValuesWithId extends ChallengeAllFormValues {
  id: string;
}

export interface ChallengePostFields extends ChallengeFormValuesWithId {
  createdAt: string;
  members: string[];
  updatedAt?: string;
}

export interface ChallengeModifyFetchProps extends ChallengeFormValuesWithId {
  userId: string;
}
export interface CreateChallengeFormProps {
  id?: string;
}
