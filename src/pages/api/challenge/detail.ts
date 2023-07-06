import { ApplicationError } from '@shared/constants';
import { database } from '@shared/firebase';
import { responseEntity } from '@shared/responseEntity';
import { doc, getDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

const REF_NAME = 'challenge';
// const COLLECTION = collection(database, REF_NAME);
const challengeReadDetailService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.body;

    const docRef = doc(database, REF_NAME, id);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const data = {
        ...docSnapshot.data(),
        userId: docSnapshot.data().userId.id,
        id: docSnapshot.id
      };
      res.status(200).json(
        responseEntity<any>({
          responseData: data,
          success: true
        })
      );
    } else {
      res.status(400).json(
        responseEntity<any>({
          responseData: null,
          success: true
        })
      );
    }
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

export default challengeReadDetailService;
