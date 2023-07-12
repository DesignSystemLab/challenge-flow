import { ApplicationError, FIREBASE_COLLECTIONS } from '@shared/constants';
import { database } from '@shared/firebase';
import { errorMessage } from '@shared/errorMessage';
import { responseEntity } from '@shared/responseEntity';
import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  getCountFromServer,
  limit,
  startAfter,
  orderBy
} from 'firebase/firestore';
import type { UserProfile } from '@auth/types';
import type { ChallengePostFields } from '@challenge/types';
import type { DocumentReference } from 'firebase/firestore';
import type { WorkspaceDocRef, Post, QueryableWorkspaceWithChallenge, WorkspaceWithChallenge } from '@workspace/types';
import type { NextApiRequest, NextApiResponse } from 'next';

interface ChallengeRef extends Omit<ChallengePostFields, 'members'> {
  userId: DocumentReference;
  members: DocumentReference[];
}

type RequestParams = {
  page: string;
};

const PAGE_VIEW = 10;
const workspaceListService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const { page } = req.query as RequestParams;
      const currentPage = Number(page);
      const { workspace, posts } = FIREBASE_COLLECTIONS;
      const postsCollection = collection(database, posts);
      const workspaceCollection = collection(database, workspace);
      const totalCount = (await getCountFromServer(workspaceCollection)).data().count;

      const workspaceQuery =
        currentPage === 1
          ? query(workspaceCollection, limit(PAGE_VIEW))
          : query(workspaceCollection, orderBy('key'), startAfter(PAGE_VIEW * (currentPage - 1)), limit(PAGE_VIEW));
      const workspaceListRef = await getDocs(workspaceQuery);

      const workspaceListPromises = workspaceListRef.docs.map(async (workspaceDoc) => {
        const workspaceId = workspaceDoc.id;
        const workspaceData = workspaceDoc.data() as WorkspaceDocRef;
        const { duration, content, memberCapacity, members, skill, userId, title } = (
          await getDoc(workspaceData.challenge)
        ).data() as ChallengeRef;

        const parseMembers = members.length
          ? await Promise.all(members.map(async (ref) => (await getDoc(ref)).data()))
          : [];

        const postQuery = query(
          postsCollection,
          where('originId', '==', workspaceId),
          where('isDeleted', '==', false),
          limit(5)
        );
        const postsByWorkspace = await getDocs(postQuery);
        const postsPromise = postsByWorkspace.docs.map(async (post) => post.data());
        const postsData = (await Promise.all(postsPromise)) as Post[];
        const master = (await getDoc(userId)).data() as Omit<UserProfile, 'uid'>;
        return {
          challengeInfo: { duration, content, memberCapacity, members, skill, title },
          posts: postsData,
          master,
          workspaceId,
          members: parseMembers
        };
      });

      const workspaceList = (await Promise.all(workspaceListPromises)) as unknown as WorkspaceWithChallenge[];

      res.status(200).json(
        responseEntity<QueryableWorkspaceWithChallenge>({
          responseData: { workspaceList, totalCount, currentPage },
          success: true
        })
      );
      return;
    }
    res.status(405).json(
      responseEntity<null>({
        responseData: null,
        success: false
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

export default workspaceListService;
