import { authOptions } from '@pages/api/auth/[...nextauth]';
import { ApplicationError } from '@shared/constants';
import { database } from '@shared/firebase';
import { responseEntity } from '@shared/responseEntity';
import { formatDateTime, getDate } from '@shared/utils/date';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

const REF_NAME = 'comment';

const modifyCommentService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      res.status(401).json(
        responseEntity<null>({
          responseData: null,
          success: false,
          message: '로그인 후 이용하실 수 있습니다.'
        })
      );
    }

    const param = req.body;
    const { id, userId, ...updateValue } = param;
    const ref = doc(database, REF_NAME, param.id);
    const docSnapshot = await getDoc(ref);
    if (!docSnapshot.exists()) {
      res.status(400).json(
        responseEntity<null>({
          responseData: null,
          success: false,
          message: ApplicationError.BADREQUEST
        })
      );
    } else if (docSnapshot.data().userId.id !== session?.user.uid) {
      res.status(401).json(
        responseEntity<null>({
          responseData: null,
          success: false,
          message: ApplicationError.UNAUTHORIZED
        })
      );
    } else {
      await updateDoc(ref, {
        ...updateValue,
        updatedAt: formatDateTime(getDate())
      });
      res.status(200).json(
        responseEntity<string>({
          responseData: ref.id,
          success: true
        })
      );
    }
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

export default modifyCommentService;
