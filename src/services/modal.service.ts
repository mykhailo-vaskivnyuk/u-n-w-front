import { SetStateAction, Dispatch } from 'react';
import { EModalContent, ModalContentPropsMap, TContent } from '@components/modal/modal.types';
import { IMenuItem } from '@components/menu/types';

type TCallback = Dispatch<SetStateAction<TContent | null>>;
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

  openMenu(data: IMenuItem[]) {
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
