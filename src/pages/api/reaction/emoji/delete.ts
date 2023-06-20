import { database } from '@shared/firebase';
import { ApplicationError } from '@shared/constants';
import { responseEntity } from '@shared/responseEntity';
import { NextApiRequest, NextApiResponse } from 'next';
import { collection, deleteDoc, doc } from 'firebase/firestore';

const REF_NAME = 'emoji';
const COLLECTION = collection(database, REF_NAME);

const EmojiReactionDeleteService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.body;
    const ref = doc(COLLECTION, id);
    await deleteDoc(ref);

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
export default EmojiReactionDeleteService;
