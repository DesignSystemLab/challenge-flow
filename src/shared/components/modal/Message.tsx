import { Dispatch, SetStateAction } from 'react';
import { Button, Modal, Text, Flex } from '@jdesignlab/react';

interface ModalProps {
  message: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  confirmText?: string;
  onConfirm?: () => void;
}

export const MessageModal = (props: ModalProps) => {
  const { confirmText = '확인', message, onConfirm, setOpen } = props;

  return (
    <Modal
      open
      onClose={() => {
        setOpen(false);
      }}
    >
      <Modal.Body>
        <Text>{message}</Text>
      </Modal.Body>
      <Modal.Footer>
        <Flex justify="center" items="center">
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
