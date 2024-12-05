import {
  EModalContent,
  ModalContentPropsMap,
  ModalProps,
  TContent,
} from '@components/modal/modal.types';
import { MenuProps } from '@components/menu/menu';
import { MessageProps } from '@components/message/message';

type TCallback = (content: TContent) => void;
type TCloseCallback = () => void;

class ModalService {
  private callback: TCallback = () => {};

  private closeCallback: TCloseCallback = () => {};

  constructor() {
    this.closeModal = this.closeModal.bind(this);
  }

  setCallback(callback: TCallback) {
    this.callback = callback;
  }

  setCloseCallback(callback: TCloseCallback) {
    this.closeCallback = callback;
  }

  openModal(data: ModalContentPropsMap[EModalContent.general]) {
    this.callback({ type: EModalContent.general, data });
  }

  closeModal() {
    this.closeCallback();
  }

  openMenu(data: MenuProps) {
    this.callback({ type: EModalContent.menu, data });
  }

  showError(message: MessageProps['message']) {
    this.callback({ type: EModalContent.error, data: { message } });
  }

  showMessage(
    message: MessageProps['message'],
    handleConfirm?: MessageProps['onConfirm'],
    handleRefuse?: MessageProps['onRefuse'],
    onClose?: ModalProps['onClose'],
  ) {
    const onConfirm =
      handleConfirm &&
      (() => {
        this.closeModal();
        handleConfirm();
      });
    const onRefuse =
      handleRefuse &&
      (() => {
        this.closeModal();
        handleRefuse();
      });
    this.callback({
      type: EModalContent.message,
      data: { message, onConfirm, onRefuse, onClose },
    });
  }
}

export const modalService = new ModalService();
