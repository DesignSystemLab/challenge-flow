type QueryKeys =
  | 'user'
  | 'workspace'
  | 'workspaceNotice'
  | 'workspacePosts'
  | 'workspacePostsByPeriod'
  | 'post'
  | 'workspaceList';

export const QUERY_KEYS: Record<QueryKeys, string> = {
  user: 'user',
  workspace: 'workspace',
  workspaceNotice: 'workspace-notice',
  workspacePosts: 'workspace-posts',
  workspacePostsByPeriod: 'workspace-posts-period',
  workspaceList: 'workspace-list',
  post: 'post'
};
