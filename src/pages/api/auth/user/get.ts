import { ApplicationError, FIREBASE_COLLECTIONS } from '@shared/constants';
import { database } from '@shared/firebase';
import { errorMessage } from '@shared/errorMessage';
import { responseEntity } from '@shared/responseEntity';
import { doc, getDoc } from 'firebase/firestore';
import type { UserProfile } from '@auth/types';
import type { NextApiRequest, NextApiResponse } from 'next';

type RequestParams = {
  uid: string;
};

const getUserInfoService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { uid } = req.query as RequestParams;
    if (uid) {
      const { user } = FIREBASE_COLLECTIONS;
      const userDocRef = doc(database, user, uid);
      const userInfo = (await getDoc(userDocRef)).data() as Omit<UserProfile, 'uid'>;

      res.status(200).json(
        responseEntity<Omit<UserProfile, 'uid'>>({
          responseData: userInfo,
          success: true
        })
      );
    }

    res.status(400).json(
      responseEntity<null>({
        responseData: null,
        success: false,
        message: ApplicationError.BADREQUEST
      })
    );
  } catch (error) {
    res.status(500).json(
      responseEntity<null>({
        responseData: null,
        success: false,
        message: errorMessage(error ?? ApplicationError.SERVER)
      })
    );
  }
};

export default getUserInfoService;
