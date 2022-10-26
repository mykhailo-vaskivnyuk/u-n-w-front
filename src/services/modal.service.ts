import { SetStateAction, Dispatch } from 'react';
import { EModalContent, ModalContentPropsMap, TContent } from '@components/modal/modal.types';

type TCallback = Dispatch<SetStateAction<TContent | null>>;

class ModalService {
  private callback: TCallback | null = null;

  setCallback(callback: TCallback) {
    this.callback = callback;
  }

  openModal(data: ModalContentPropsMap[EModalContent.general]) {
    this.callback && this.callback({ type: EModalContent.general, data });
  }

  showMessage(
    text: ModalContentPropsMap[EModalContent.message]['text'],
    onClose?: ModalContentPropsMap[EModalContent.message]['onClose'],
  ) {
    this.callback && this.callback({ type: EModalContent.message, data: { text, onClose } });
  }
}

export default new ModalService();
