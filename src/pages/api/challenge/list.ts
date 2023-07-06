import { ChallengeModifyFetchProps, ChallengePostFields } from '@challenge/types';
import { ApplicationError } from '@shared/constants';
import { database } from '@shared/firebase';
import { responseEntity } from '@shared/responseEntity';
import { DocumentData, QueryDocumentSnapshot, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

const REF_NAME = 'challenge';
const COLLECTION = collection(database, REF_NAME);

const challengeReadListService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const q = query(COLLECTION, orderBy('createdAt', 'desc'));
    const { docs } = await getDocs(q);

    const parsedData = docs?.map((eachDoc: QueryDocumentSnapshot<DocumentData>) => ({
      ...eachDoc.data(),
      userId: eachDoc.data().userId.id,
      likes: eachDoc.data().likes.map((d: ChallengePostFields) => d.id),
      id: eachDoc.id
    })) as ChallengeModifyFetchProps[];

    res.status(200).json(
      responseEntity<ChallengeModifyFetchProps[]>({
        responseData: parsedData,
        success: true
      })
    );
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

export default challengeReadListService;
