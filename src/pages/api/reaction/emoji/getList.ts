import { database } from '@shared/firebase';
import { ApplicationError } from '@shared/constants';
import { responseEntity } from '@shared/responseEntity';
import { getDocRef } from '@shared/utils/firestore';
import { EmojiDataWithId } from '@reaction/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { DocumentData, QueryDocumentSnapshot, collection, getDocs, orderBy, query, where } from 'firebase/firestore';

const REF_NAME = 'emoji';
const CHALLENGE_REF_NAME = 'challenge';
const COLLECTION = collection(database, REF_NAME);

const EmojiReactionListService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { originId } = req.query;
    const q = query(
      COLLECTION,
      where('originId', '==', getDocRef(CHALLENGE_REF_NAME, originId as string)),
      orderBy('createdAt', 'desc')
    );

    const { docs } = await getDocs(q);
    const parseData = docs?.map((eachDoc: QueryDocumentSnapshot<DocumentData>) => ({
      ...eachDoc.data(),
      userId: eachDoc.data().userId.id,
      id: eachDoc.id
    })) as EmojiDataWithId[];

    res.status(200).json(
      responseEntity<EmojiDataWithId[]>({
        responseData: parseData,
        success: true
      })
    );
  } catch (error) {
    console.error(error);
    res.status(400).json(
      responseEntity<[]>({
        responseData: [],
        success: false,
        message: ApplicationError.SERVER
      })
    );
  }
};
export default EmojiReactionListService;
