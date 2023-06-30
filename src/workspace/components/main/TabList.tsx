import { useContext, useState } from 'react';
import { useQueryWorkspace } from '@workspace/hooks/useQueryWorkspace';
import { useQueryWorkspaceNotice } from '@workspace/hooks/useQueryWorkspaceNotice';
import { MarkdownEditor } from '@shared/components/markdownEditor';
import { useUserAuth } from '@auth/hooks/useUserAuth';
import { CommonModal } from '@shared/components/CommonModal';
import { Tabs } from '@jdesignlab/react';
import { EmptyPost } from './EmptyPost';
import { workspaceMachineContext } from '../../machines/workspaceMachineContext';
import { workspaceContext } from '../../workspaceContext';
import { useQueryPosts } from '../../hooks/useQueryPosts';
import { ContentExistTabItem } from '../posts/ContentExistTabItem';
import { ContentNotExistTabItem } from '../posts/ContentNotExistTabItem';
import type { Post } from '../../types';

export const TabList = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [state] = workspaceMachineContext.useActor();
  const { data: user } = useUserAuth();
  const { workspaceId } = useContext(workspaceContext);
  const { data: workspaceData } = useQueryWorkspace(workspaceId);
  const { data: notice } = useQueryWorkspaceNotice(workspaceId);
  const { data: posts } = useQueryPosts(state.context.period, workspaceId);

  return (
    <div css={{ padding: '0 16px 8px 16px', height: '100%' }}>
      <CommonModal
        open={openModal}
        title="경고"
        message="해당 게시글을 삭제하시겠습니까?"
        type="confirm"
        onClose={() => {
          setOpenModal(false);
        }}
      />
      <Tabs size="lg" variant="enclosed" full>
        <Tabs.List>
          <Tabs.Trigger value="notice">공지사항</Tabs.Trigger>
          {workspaceData?.members.map((member) => (
            <Tabs.Trigger value={member.email ?? ''} key={member.email}>
              {member.name}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content value="notice">{notice}</Tabs.Content>
        {workspaceData?.members.map((member) => {
          const { email } = member;
          const userPost = posts?.find((post: Post) => post.author === email);
          const content: string = userPost?.content ?? '';
          const isOwnTab = email === user?.email ?? false;

          return (
            <Tabs.Content value={email ?? ''} key={email}>
              {content ? (
                <ContentExistTabItem isOwnPost={!!content} isOwnTab={isOwnTab}>
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
