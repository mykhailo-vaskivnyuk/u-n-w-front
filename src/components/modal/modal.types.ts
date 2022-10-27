import { ReactElement } from 'react';
import { Classes } from 'jss';

export interface ModalProps {
  onClose?: () => void;
  classes?: Partial<Classes<'root' | 'backdrop' | 'modal' | 'content' | 'closeBtn'>>;
  onBackdropClick?: () => void;
  showCloseIcon?: boolean;
  closeOnBackdropClick?: boolean;
}

export enum EModalContent {
  general,
  message,
  error,
}
export interface ModalContentPropsMap {
  [EModalContent.general]: ReactElement;
  [EModalContent.message]: string;
  [EModalContent.error]: string;
}
type CreateMapFromMap<T extends EModalContent = EModalContent> = {
  [Q in T]: { type: Q; data: ModalContentPropsMap[Q] };
};
type ModalContentMap = CreateMapFromMap;
export type TContent = ModalContentMap[keyof ModalContentMap];
