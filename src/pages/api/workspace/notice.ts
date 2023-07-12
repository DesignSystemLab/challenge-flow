import { ApplicationError, FIREBASE_COLLECTIONS } from '@shared/constants';
import { database } from '@shared/firebase';
import { responseEntity } from '@shared/responseEntity';
import { WorkspaceDocRef } from '@workspace/types';
import { doc, getDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

const workspaceNoticeService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const ref = doc(database, FIREBASE_COLLECTIONS.workspace, 'JI7P1eXtAReQdlHcO9s4');
    const workspaceDoc = (await getDoc(ref)).data() as WorkspaceDocRef;
    const { notice } = workspaceDoc;
    if (typeof notice === 'string') {
      res.status(200).json(
        responseEntity<string>({
          responseData: notice,
          success: true
        })
      );
      return;
    }

    res.status(400).json(
      responseEntity<null>({
        responseData: null,
        success: false,
        message: '공지사항이 존재하지 않습니다.'
      })
    );
  } catch (error) {
    res.status(500).json(
      responseEntity<null>({
        responseData: null,
        success: false,
        message: ApplicationError.SERVER
      })
    );
  }
};

export default workspaceNoticeService;
