import { SetStateAction, Dispatch, ReactElement } from 'react';

type TCallback = Dispatch<SetStateAction<ReactElement | null>>;

class ModalService {
  private callback: TCallback | null = null;

  setCallback(callback: TCallback) {
    this.callback = callback;
  }

  openModal(content: ReactElement) {
    this.callback && this.callback(content);
  }
}

export default new ModalService();
