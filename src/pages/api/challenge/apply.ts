import { ApplicationError } from '@shared/constants';
import { database } from '@shared/firebase';
import { responseEntity } from '@shared/responseEntity';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

const REF_NAME = 'challenge';

const challengeCreateService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const param = req.body;
    const ref = doc(database, REF_NAME, param.id);
    // addDataInArrayField
    const docSnapshot = await getDoc(ref);
    if (docSnapshot.exists()) {
      const currentArray = docSnapshot.data().members;
      const updatedArray = [...currentArray, param.userId];
      await updateDoc(ref, {
        members: updatedArray
      });
    }

    res.status(200).json(
      responseEntity<boolean>({
        responseData: true,
        success: true
      })
    );
  } catch (error) {
    res.status(400).json(
      responseEntity<boolean>({
        responseData: false,
        success: false,
        message: ApplicationError.SERVER
      })
    );
  }
};

export default challengeCreateService;
