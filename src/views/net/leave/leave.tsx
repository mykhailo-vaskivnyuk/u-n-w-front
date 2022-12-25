import { FC, useEffect } from 'react';
import { MessagesMap } from '@constants/messages';
import { useNavigateTo } from 'contexts/navigate/navigate';
import { format } from '@utils/utils';
import { modalService } from '@services/modal.service';
import { app } from '@api/app/client.app';

const { NET_LEAVE, NET_LEAVE_FAILED } = MessagesMap;
const showSuccess = (netName: string) => modalService.showMessage(format(NET_LEAVE, netName));
const showFail = () => modalService.showError(NET_LEAVE_FAILED);

export const NetLeave: FC = () => {
  const navigate = useNavigateTo();

  useEffect(() => {
    let isLeaving = false;
    const { net } = app.getState();
    const { parent_net_id: netId, name } = net!;

    const handleConfirm = () => {
      isLeaving = true;
      app.netMethods
        .leave()
        .then((success) => {
          if (!success) {
            showFail();
            return navigate.back();
          }
          showSuccess(name);
          netId ? navigate.toNet({ net_id: netId }).id(true) : navigate.toIndex(true);
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
