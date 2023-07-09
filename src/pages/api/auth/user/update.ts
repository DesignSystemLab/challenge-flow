import { ApplicationError, FIREBASE_COLLECTIONS } from '@shared/constants';
import { errorMessage } from '@shared/errorMessage';
import { responseEntity } from '@shared/responseEntity';
import { database } from '@shared/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

type ReqeustParams = {
  uid: string;
  skills?: string[];
  name?: string | null;
  photo?: string | null;
  note?: string | null;
};

const updateUserPfofileService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { uid, name = null, note = null, photo = null, skills = null } = req.body as ReqeustParams;

    if (!uid) {
      res.status(401).json(
        responseEntity<null>({
          responseData: null,
          success: false,
          message: ApplicationError.UNAUTHORIZED
        })
      );
      return;
    }

    if (req.method === 'PUT') {
      const { user } = FIREBASE_COLLECTIONS;
      const userRef = doc(database, user, uid);
      await updateDoc(userRef, {
        name,
        note,
        photo,
        skills
      });

      res.status(200).json(
        responseEntity<null>({
          responseData: null,
          success: true
        })
      );
      return;
    }
    res.status(405).json(
      responseEntity<null>({
        responseData: null,
        success: false,
        message: ApplicationError.NOTALLOWED
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

export default updateUserPfofileService;
