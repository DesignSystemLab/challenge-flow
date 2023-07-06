import { ApplicationError } from '@shared/constants';
import { database } from '@shared/firebase';
import { responseEntity } from '@shared/responseEntity';
import { formatDateTime, getDate } from '@shared/utils/date';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

const REF_NAME = 'comment';
const DELETED_REF_NAME = 'deleted-comment';

const deleteCommentService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const param = req.body;

    // TODO id 검사

    const targetRef = doc(database, REF_NAME, param.id);
    const destRef = doc(database, DELETED_REF_NAME, param.id);

    const docSnapshot = await getDoc(targetRef);
    if (docSnapshot.exists()) {
      await setDoc(destRef, {
        ...docSnapshot.data(),
        deleteAt: formatDateTime(getDate())
      });
      await deleteDoc(targetRef);
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

export default deleteCommentService;
