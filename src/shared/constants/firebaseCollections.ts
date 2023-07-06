type Collections = 'challenge' | 'comment' | 'dletedChallenge' | 'emoji' | 'user' | 'workspace' | 'posts';

export const FIREBASE_COLLECTIONS: Record<Collections, string> = {
  user: 'user',
  workspace: 'workspace',
  dletedChallenge: 'deleted-challenge',
  challenge: 'chellange',
  comment: 'comment',
  emoji: 'emoji',
  posts: 'posts'
};
