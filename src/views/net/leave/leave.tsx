import { FC, useEffect } from 'react';
import { MessagesMap } from '@constants/messages';
import { useNavigateTo } from '@hooks/useNavigateTo';
import { format } from '@utils/format.utils';
import { modalService } from '@services/modal.service';
import { app } from '@client/app';

const { NET_LEAVE, NET_LEAVE_FAIL } = MessagesMap;
const showSuccess = (netName: string) => modalService.showMessage(format(NET_LEAVE, netName));
const showFail = () => modalService.showError(NET_LEAVE_FAIL);

export const NetLeave: FC = () => {
  const navigate = useNavigateTo();

  useEffect(() => {
    let isLeaving = false;
    const { net } = app.getState();
    const { parent_net_id: parentNetId, name } = net!;

    const handleConfirm = () => {
      isLeaving = true;
      app.net
        .leave()
        .then((success) => {
          if (!success) {
            showFail();
            return navigate.back();
          }
          showSuccess(name);
          parentNetId ? navigate.toNet({ net_id: parentNetId }).id(true) : navigate.toIndex(true);
        })
        .catch(navigate.back);
    };

    const message = format(MessagesMap.NET_LEAVE_CONFIRM, name);
    const handleClose = () => !isLeaving && navigate.back();
    modalService.showMessage(message, handleConfirm, undefined, handleClose);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
