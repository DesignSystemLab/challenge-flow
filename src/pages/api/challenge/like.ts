import { ApplicationError, FIREBASE_COLLECTIONS } from '@shared/constants';
import { database } from '@shared/firebase';
import { responseEntity } from '@shared/responseEntity';
import { getDocRef } from '@shared/utils/firestore';
import { DocumentData, arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

const REF_NAME = FIREBASE_COLLECTIONS.challenge;

const challengeLikeService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const param = req.body;
    const ref = doc(database, REF_NAME, param.originId);
    const docSnapshot = await getDoc(ref);
    if (docSnapshot.exists()) {
      const currentArray = docSnapshot.data().likes;
      const userId = getDocRef('user', param.userId);

      let hasAlreadyLiked = false;
      currentArray.forEach((likedUser: DocumentData) => {
        if (likedUser.id === param.userId) {
          hasAlreadyLiked = true;
        }
      });

      if (hasAlreadyLiked) {
        await updateDoc(ref, {
          likes: arrayRemove(userId)
        });
      } else {
        const updatedArray = [...currentArray, userId];
        await updateDoc(ref, {
          likes: updatedArray
        });
      }
    } else {
      res.status(400).json(
        responseEntity<null>({
          responseData: null,
          success: false,
          message: ApplicationError.BADREQUEST
        })
      );
    }

    res.status(200).json(
      responseEntity<boolean>({
        responseData: true,
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

export default challengeLikeService;
