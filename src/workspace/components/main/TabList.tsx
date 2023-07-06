import { useContext } from 'react';
import { useQueryWorkspace } from '@workspace/hooks/useQueryWorkspace';
import { useQueryWorkspaceNotice } from '@workspace/hooks/useQueryWorkspaceNotice';
import { MarkdownEditor } from '@shared/components/markdownEditor';
import { Tabs } from '@jdesignlab/react';
import { EmptyPost } from './EmptyPost';
import { workspaceMachineContext } from '../../machines/workspaceMachineContext';
import { workspaceContext } from '../../workspaceContext';
import { useQueryPosts } from '../../hooks/useQueryPosts';
import { ContentExistTabItem } from '../posts/ContentExistTabItem';
import { ContentNotExistTabItem } from '../posts/ContentNotExistTabItem';
import type { Post } from '../../types';

export const TabList = () => {
  const [state] = workspaceMachineContext.useActor();
  const { workspaceId, userSession } = useContext(workspaceContext);
  const { data: workspaceData } = useQueryWorkspace(workspaceId);
  const { data: notice } = useQueryWorkspaceNotice(workspaceId);
  const { data: posts } = useQueryPosts(state.context.period, workspaceId);

  return (
    <div css={{ padding: '0 16px 8px 16px', height: '100%' }}>
      <Tabs size="lg" variant="enclosed" full>
        <Tabs.List>
          <Tabs.Trigger value="notice">공지사항</Tabs.Trigger>
          {workspaceData?.members.map((member) => (
            <Tabs.Trigger value={member.email ?? ''} key={member.uid}>
              {member.name}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content value="notice">{notice}</Tabs.Content>
        {workspaceData?.members.map((member) => {
          const { email, uid } = member;
          const userPost = posts?.find((post: Post) => post.authorId === uid);
          const content: string = userPost?.content ?? '';
          const isOwnTab = userSession?.user.uid === uid;

          return (
            <Tabs.Content value={email ?? ''} key={uid}>
              {content && userPost ? (
                <ContentExistTabItem
                  isOwnPost={!!content}
                  isOwnTab={isOwnTab}
                  postId={userPost.postId}
                  period={state.context.period}
                  workspaceId={workspaceId}
                >
                  <MarkdownEditor viewer content={content} autoHeight />
                </ContentExistTabItem>
              ) : (
                <ContentNotExistTabItem isOwnTab={isOwnTab}>
                  <EmptyPost workspaceId={workspaceId} period={state.context.period} />
                </ContentNotExistTabItem>
              )}
            </Tabs.Content>
          );
        })}
      </Tabs>
    </div>
  );
};
