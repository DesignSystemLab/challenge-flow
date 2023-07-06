import { Dispatch, SetStateAction } from 'react';
import { Button, Modal, Text, Flex } from '@jdesignlab/react';

interface ModalProps {
  title: string;
  message: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const ConfirmModal = (props: ModalProps) => {
  const { title, message, confirmText = '확인', cancelText = '취소', onConfirm, onCancel, setOpen } = props;

  return (
    <Modal
      open
      onClose={() => {
        setOpen(false);
      }}
    >
      <Modal.Header>
        <Text size="lg">{title}</Text>
      </Modal.Header>
      <Modal.Body>
        <Text>{message}</Text>
      </Modal.Body>
      <Modal.Footer>
        <Flex justify="flex-end" gap="16px">
          <Button
            type="button"
            color="red-lighten2"
            onClick={() => {
              if (onCancel) {
                onCancel();
              }
              setOpen(false);
            }}
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            onClick={() => {
              if (onConfirm) {
                onConfirm();
              }
              setOpen(false);
            }}
          >
            {confirmText}
          </Button>
        </Flex>
      </Modal.Footer>
    </Modal>
  );
};
