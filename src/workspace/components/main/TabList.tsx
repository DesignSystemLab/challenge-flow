import { useContext, useState } from 'react';
import { useQueryWorkspace } from '@workspace/hooks/useQueryWorkspace';
import { useQueryWorkspaceNotice } from '@workspace/hooks/useQueryWorkspaceNotice';
import { MarkdownEditor } from '@shared/components/markdownEditor';
import { useUserAuth } from '@auth/hooks/useUserAuth';
import { CommonModal } from '@shared/components/CommonModal';
import { Button, Flex, Tabs, Text } from '@jdesignlab/react';
import { EmptyPost } from './EmptyPost';
import { workspaceMachineContext } from '../../machines/workspaceMachineContext';
import { workspaceContext } from '../../workspaceContext';
import { useQueryPosts } from '../../hooks/useQueryPosts';
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
          const content = userPost?.content ?? '';
          return (
            <Tabs.Content value={email ?? ''} key={email}>
              {content && (
                <Flex direction="column" justify="center" gap="8px">
                  <MarkdownEditor viewer content={content} />
                  <Flex direction="row" gap="8px" justify="flex-end">
                    <Button
                      color="red-lighten2"
                      onClick={() => {
                        setOpenModal(true);
                      }}
                    >
                      삭제
                    </Button>
                    <Button type="button">수정</Button>
                  </Flex>
                </Flex>
              )}
              {!content && email === user?.email && (
                <EmptyPost workspaceId={workspaceId} period={state.context.period} />
              )}
              {!content && email !== user?.email && (
                <Text align="center" variant="heading">
                  작성된 글이 없어요!
                </Text>
              )}
            </Tabs.Content>
          );
        })}
      </Tabs>
    </div>
  );
};
