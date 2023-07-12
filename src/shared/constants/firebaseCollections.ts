type Collections = 'challenge' | 'comment' | 'deletedChallenge' | 'emoji' | 'user' | 'workspace' | 'posts';

export const FIREBASE_COLLECTIONS: Record<Collections, string> = {
  user: 'user',
  workspace: 'workspace',
  deletedChallenge: 'deleted-challenge',
  challenge: 'challenge',
  comment: 'comment',
  emoji: 'emoji',
  posts: 'posts'
};
