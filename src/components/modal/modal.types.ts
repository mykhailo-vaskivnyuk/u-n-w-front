import { ReactElement } from 'react';
import { Classes } from 'jss';
import { MenuProps } from '@components/menu/menu';
import { MessageProps } from '@components/message/message';

export interface ModalProps {
  onClose?: () => void;
  classes?: Partial<Classes<'root' | 'backdrop' | 'modal' | 'content' | 'closeBtn'>>;
  onBackdropClick?: () => void;
  showCloseIcon?: boolean;
  closeOnBackdropClick?: boolean;
}

export enum EModalContent {
  general,
  menu,
  message,
  error,
}

export interface ModalContentPropsMap {
  [EModalContent.general]: ReactElement;
  [EModalContent.menu]: MenuProps;
  [EModalContent.message]: MessageProps & Pick<ModalProps, 'onClose'>;
  [EModalContent.error]: Omit<MessageProps, 'error'>;
}
type CreateMapFromMap<T extends EModalContent = EModalContent> = {
  [Q in T]: { type: Q; data: ModalContentPropsMap[Q] };
};
type ModalContentMap = CreateMapFromMap;
export type TContent = ModalContentMap[keyof ModalContentMap];
