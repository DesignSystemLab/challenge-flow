import { ReactNode, useState } from 'react';
import { ConfirmModal, MessageModal } from '@shared/components/modal';
import { Button, Flex } from '@jdesignlab/react';
import { useRouter } from 'next/router';
import { ModalOpen } from './ModalOpen';
import { useRemovePost } from '../../hooks/useRemovePost';
import { useQueryPosts } from '../../hooks/useQueryPosts';
import type { PeriodFormat } from '../../types';

interface Props {
  children: ReactNode;
  period: PeriodFormat;
  postId: string;
  workspaceId: string;
  isOwnPost: boolean;
  isOwnTab: boolean;
}

export const ContentExistTabItem = (props: Props) => {
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [openMessage, setOpenMessage] = useState<boolean>(false);
  const router = useRouter();
  const { children, isOwnPost, isOwnTab, postId, period, workspaceId } = props;
  const { refetch: refetchPosts } = useQueryPosts(period, workspaceId);
  const { mutate } = useRemovePost(() => {
    setOpenMessage(true);
  });

  const moveToPostUpdate = () => {
    router.push({
      pathname: '/workspace/edit',
      query: {
        postId,
        workspaceId
      }
    });
  };

  if (!isOwnPost) {
    return null;
  }

  return (
    <>
      <ModalOpen
        state={openConfirm || openMessage}
        modalType={openConfirm ? 'confrim' : 'message'}
        confirm={
          <ConfirmModal
            title="경고"
            message="해당 POST를 삭제하시겠어요?"
            setOpen={setOpenConfirm}
            onConfirm={() => {
              mutate({
                postId,
                turn: period,
                workspaceId
              });
            }}
          />
        }
        message={
          <MessageModal
            message="게시글을 삭제하였습니다."
            setOpen={setOpenMessage}
            onConfirm={() => {
              refetchPosts();
            }}
          />
        }
      />
      <Flex direction="column" justify="center" gap="8px" style={{ height: '100%' }}>
        {children}
        {isOwnTab && (
          <Flex direction="row" gap="8px" justify="flex-end">
            <Button
              color="red-lighten2"
              onClick={() => {
                setOpenConfirm(true);
              }}
            >
              삭제
            </Button>
            <Button type="button" onClick={moveToPostUpdate}>
              수정
            </Button>
          </Flex>
        )}
      </Flex>
    </>
  );
};
