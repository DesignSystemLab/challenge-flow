import { authOptions } from '@pages/api/auth/[...nextauth]';
import { database } from '@shared/firebase';
import { ApplicationError } from '@shared/constants';
import { responseEntity } from '@shared/responseEntity';
import { NextApiRequest, NextApiResponse } from 'next';
import { collection, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { getServerSession } from 'next-auth';

const REF_NAME = 'emoji';
const COLLECTION = collection(database, REF_NAME);

const EmojiReactionDeleteService = async (req: NextApiRequest, res: NextApiResponse) => {
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

    const { id } = req.body;
    const ref = doc(COLLECTION, id);
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
      await deleteDoc(ref);
      res.status(200).json(
        responseEntity<null>({
          responseData: null,
          success: true
        })
      );
    }
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
