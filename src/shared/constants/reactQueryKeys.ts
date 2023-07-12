type QueryKeys = 'user' | 'workspace' | 'workspaceNotice' | 'workspacePosts' | 'post' | 'workspaceList';

export const QUERY_KEYS: Record<QueryKeys, string> = {
  user: 'user',
  workspace: 'workspace',
  workspaceNotice: 'workspace-notice',
  workspacePosts: 'workspace-posts',
  workspaceList: 'workspace-list',
  post: 'post'
};
