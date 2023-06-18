import { ApplicationError } from '@shared/constants';
import { responseEntity } from '@shared/responseEntity';
import { database } from '@shared/firebase';
import { getDoc, doc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { WorkspaceDocRef, ChallengeDocRef, Workspace } from '@workspace/types';
import type { UserProfile } from '@auth/types';

const workspaceInfoHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const ref = doc(database, 'workspace', 'JI7P1eXtAReQdlHcO9s4');
    const workspaceDoc = (await getDoc(ref)).data() as WorkspaceDocRef;
    const challengeRef = await getDoc(workspaceDoc.challenge);
    const challenge = challengeRef.data() as unknown as ChallengeDocRef;
    const members = (await Promise.all(
      challenge.members.map(async (member) => (await getDoc(member)).data())
    )) as UserProfile[];

    return res.status(200).json(
      responseEntity<Workspace>({
        responseData: {
          challengeInfo: challenge,
          members
        },
        success: true
      })
    );
  } catch (error) {
    res.status(400).json(
      responseEntity<null>({
        responseData: null,
        success: false,
        message: ApplicationError.SERVER
      })
    );
  }
};

export default workspaceInfoHandler;
