import { ApplicationError } from '@shared/constants';
import { responseEntity } from '@shared/responseEntity';
import { database } from '@shared/firebase';
import { getDoc, doc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { WorkspaceDocRef, ChallengeDocRef, Workspace } from '@workspace/types';
import type { UserProfile } from '@auth/types';

const workspaceInfoHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { workspaceId } = req.query;
    const ref = doc(database, 'workspace', workspaceId as string);
    const workspaceDoc = (await getDoc(ref)).data() as WorkspaceDocRef;

    if (workspaceDoc) {
      const challengeRef = await getDoc(workspaceDoc.challenge);
      const challenge = challengeRef.data() as unknown as ChallengeDocRef;

      const members = (await Promise.all(
        challenge.members.map(async (member) => {
          const memberData = (await getDoc(member)).data() as UserProfile;
          memberData.uid = member.id;
          return memberData;
        })
      )) as UserProfile[];

      res.status(200).json(
        responseEntity<Workspace>({
          responseData: {
            challengeInfo: challenge,
            members
          },
          success: true
        })
      );
      return;
    }
    res.status(404).json(
      responseEntity<null>({
        responseData: null,
        success: false,
        message: '존재하지 않는 워크스페이스입니다.'
      })
    );
  } catch (error) {
    res.status(404).json(
      responseEntity<null>({
        responseData: null,
        success: false,
        message: ApplicationError.SERVER
      })
    );
  }
};

export default workspaceInfoHandler;
