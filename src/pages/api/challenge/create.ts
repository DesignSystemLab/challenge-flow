import { ApplicationError } from '@shared/constants';
import { database } from '@shared/firebase';
import { responseEntity } from '@shared/responseEntity';
import { formatDateTime, getDate } from '@shared/utils/date';
import { createOne, getDocRef } from '@shared/utils/firestore';
import { collection, doc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

const REF_NAME = 'challenge';
const COLLECTION = collection(database, REF_NAME);
const challengeCreateService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const param = req.body;
    const ref = doc(COLLECTION);
    param.userId = getDocRef('user', param.userId);

    await createOne(ref, { ...param, createdAt: formatDateTime(getDate()) });

    res.status(200).json(
      responseEntity<string>({
        responseData: ref.id,
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

export default challengeCreateService;
