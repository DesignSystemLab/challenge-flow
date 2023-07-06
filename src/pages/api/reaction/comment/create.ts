import { ApplicationError } from '@shared/constants';
import { database } from '@shared/firebase';
import { responseEntity } from '@shared/responseEntity';
import { formatDateTime, getDate } from '@shared/utils/date';
import { createOne, getDocRef } from '@shared/utils/firestore';
import { collection, doc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

const REF_NAME = 'comment';
const COLLECTION = collection(database, REF_NAME);
const createCommentService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const param = req.body;
    param.originId = getDocRef('challenge', param.originId); // TODO
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
