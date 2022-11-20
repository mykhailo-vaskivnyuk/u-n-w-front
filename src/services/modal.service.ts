import { EModalContent, ModalContentPropsMap, TContent } from '@components/modal/modal.types';
import { MenuProps } from '@components/menu/menu';

type TCallback = (content: TContent) => void;
type TCloseCallback = () => void;

class ModalService {
  private callback: TCallback | null = null;

  private closeCallback: TCloseCallback | null = null;

  setCallback(callback: TCallback) {
    this.callback = callback;
  }

  setCloseCallback(callback: TCloseCallback) {
    this.closeCallback = callback;
  }

  openModal(data: ModalContentPropsMap[EModalContent.general]) {
    this.callback && this.callback({ type: EModalContent.general, data });
  }

  closeModal() {
    this.closeCallback && this.closeCallback();
  }

  openMenu(data: MenuProps) {
    this.callback && this.callback({ type: EModalContent.menu, data });
  }

  showError(data: ModalContentPropsMap[EModalContent.error]) {
    this.callback && this.callback({ type: EModalContent.error, data });
  }

  showMessage(data: ModalContentPropsMap[EModalContent.message]) {
    this.callback && this.callback({ type: EModalContent.message, data });
  }
}

export const modalService = new ModalService();
