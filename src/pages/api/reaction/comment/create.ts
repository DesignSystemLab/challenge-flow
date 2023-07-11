import { authOptions } from '@pages/api/auth/[...nextauth]';
import { ApplicationError } from '@shared/constants';
import { database } from '@shared/firebase';
import { responseEntity } from '@shared/responseEntity';
import { formatDateTime, getDate } from '@shared/utils/date';
import { createOne, getDocRef } from '@shared/utils/firestore';
import { collection, doc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

const REF_NAME = 'comment';
const COLLECTION = collection(database, REF_NAME);
const createCommentService = async (req: NextApiRequest, res: NextApiResponse) => {
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

    const { domain, ...param } = req.body;
    param.originId = getDocRef(domain, param.originId);
    param.userId = getDocRef('user', param.userId);
    const ref = doc(COLLECTION);

    await createOne(ref, { ...param, createdAt: formatDateTime(getDate()) });
    res.status(200).json(
      responseEntity<string>({
        responseData: ref.id,
        success: true
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

export default createCommentService;
