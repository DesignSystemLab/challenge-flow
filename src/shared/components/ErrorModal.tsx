import { useState } from 'react';
import { Button, Modal, Text } from '@jdesignlab/react';
import { useErrorBoundary } from 'react-error-boundary';
import { FirebaseError } from 'firebase/app';

interface ErrorProps {
  error: Error | FirebaseError;
}
export const ErrorModal = (props: ErrorProps) => {
  const { error } = props;
  const { resetBoundary } = useErrorBoundary();
  const [open, setOpen] = useState<boolean>(true);

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        resetBoundary();
      }}
    >
      <Modal.Header>
        <Text size="lg">Error</Text>
      </Modal.Header>
      <Modal.Body>
        <Text color="red-base">{error.message}</Text>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            setOpen(false);
            resetBoundary();
          }}
        >
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
