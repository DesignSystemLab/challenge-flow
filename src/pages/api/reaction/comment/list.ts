import { CommentDataWithId } from '@reaction/comment/types/data';
import { ApplicationError } from '@shared/constants';
import { database } from '@shared/firebase';
import { responseEntity } from '@shared/responseEntity';
import { getDocRef } from '@shared/utils/firestore';
import { DocumentData, QueryDocumentSnapshot, collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

const REF_NAME = 'comment';
const COLLECTION = collection(database, REF_NAME);

const getCommentListService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { domain, originId } = req.query;

    if (!originId) {
      res.status(400).json(
        responseEntity<null>({
          responseData: null,
          success: false,
          message: ApplicationError.BADREQUEST
        })
      );
    }

    const q = query(
      COLLECTION,
      where('originId', '==', getDocRef(domain as string, originId as string)),
      orderBy('createdAt', 'desc')
    );

    const { docs } = await getDocs(q);
    const parseData = docs?.map((eachDoc: QueryDocumentSnapshot<DocumentData>) => ({
      ...eachDoc.data(),
      userId: eachDoc.data().userId.id,
      id: eachDoc.id
    })) as CommentDataWithId[];

    res.status(200).json(
      responseEntity<CommentDataWithId[]>({
        responseData: parseData,
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

export default getCommentListService;
