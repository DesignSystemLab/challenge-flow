import { database } from '@shared/firebase';
import { responseEntity } from '@shared/responseEntity';
import { ApplicationError } from '@shared/constants/appplicationError';
import { errorMessage } from '@shared/errorMessage';
import { getDate } from '@shared/utils/date';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

const workspacePostService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const post = req.body;
    const createdAt = Timestamp.fromDate(getDate());
    const result = await addDoc(collection(database, 'posts'), { ...post, createdAt });
    if (result) {
      res.status(200).json(
        responseEntity<null>({
          responseData: null,
          success: true
        })
      );
      return;
    }
    res.status(400).json(
      responseEntity<null>({
        responseData: null,
        success: false,
        message: ApplicationError.FIREBASE
      })
    );
  } catch (error) {
    res.status(404).json(
      responseEntity<null>({
        responseData: null,
        success: false,
        message: errorMessage(error ?? ApplicationError.SERVER)
      })
    );
  }
};

export default workspacePostService;
