import type { ReactElement } from 'react';

interface Props {
  state: boolean;
  modalType: 'message' | 'confrim';
  message: ReactElement;
  confirm: ReactElement;
}

export const ModalOpen = (props: Props) => {
  const { modalType, message, confirm, state } = props;
  if (!state) {
    return null;
  }
  return modalType === 'confrim' ? confirm : message;
};
