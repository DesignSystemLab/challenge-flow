import { database } from '@shared/firebase';
import { formatDateTime, getDate } from '@shared/utils/date';
import { ApplicationError } from '@shared/constants';
import { responseEntity } from '@shared/responseEntity';
import { getDocRef, createOne } from '@shared/utils/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { collection, doc } from 'firebase/firestore';

const REF_NAME = 'emoji';
const CHALLENGE_REF_NAME = 'challenge';
const COLLECTION = collection(database, REF_NAME);

const emojiReactionCreateService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const param = req.body;
    const ref = doc(COLLECTION);
    await createOne(ref, {
      emoji: param.emojiValue,
      userId: param.userId,
      // uerId: getDocRef('user', props.userId),
      originId: getDocRef(CHALLENGE_REF_NAME, param.originId),
      createdAt: formatDateTime(getDate())
    });

    res.status(200).json(
      responseEntity<null>({
        responseData: null,
        success: true
      })
    );
  } catch (error) {
    console.error(error);
    res.status(400).json(
      responseEntity<null>({
        responseData: null,
        success: false,
        message: ApplicationError.SERVER
      })
    );
  }
};
export default emojiReactionCreateService;
