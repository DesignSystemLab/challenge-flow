import { useEffect, useState } from 'react';
import { Button, Modal, Text } from '@jdesignlab/react';

interface ModalProps {
  open: boolean;
  title: string;
  message: string;
  type: 'alert' | 'confirm';
  onClose?: () => void;
  onCancel?: () => void;
}

export const CommonModal = (props: ModalProps) => {
  const { title, message, type = 'alert', onClose, onCancel, open = false } = props;
  const [isOpen, setIsOpen] = useState<boolean>(open);

  useEffect(() => {
    console.log('야!!');
    setIsOpen(open);
  }, [open]);

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <Modal.Header>
        <Text size="lg">{title}</Text>
      </Modal.Header>
      <Modal.Body>
        <Text>{message}</Text>
      </Modal.Body>
      <Modal.Footer>
        {type === 'confirm' && (
          <Button
            type="button"
            color="red-lighten3"
            onClick={() => {
              setIsOpen(false);
              if (onCancel) {
                onCancel();
              }
            }}
          >
            취소
          </Button>
        )}
        <Button
          type="button"
          onClick={() => {
            setIsOpen(false);
            if (onClose) {
              onClose();
            }
          }}
        >
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
