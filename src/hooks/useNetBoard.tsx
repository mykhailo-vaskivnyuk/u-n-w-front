/* eslint-disable react/no-danger */
import React, { useCallback, useMemo } from 'react';
import { NetBoardFormValues } from '@components/forms/net/board/board.schema';
import { modalService } from '@services/modal.service';
import { useNet } from '@hooks/useNet';
import { app } from '@client/app';
import { FormContainer } from '@components/containers/form.container';
import { NetBoardForm } from '@components/forms/net/board/board';

export const useNetBoard = () => {
  useNet();
  const { boardMessages, userNetData } = app.getState();

  const boardMessage = useMemo(
    () => boardMessages.find(({ member_id: v }) => v === userNetData!.node_id),
    [boardMessages, userNetData],
  );

  const handleFail = useCallback(
    (values: NetBoardFormValues) => {
      modalService.closeModal();
      modalService.openModal(
        <FormContainer modal>
          <NetBoardForm
            boardMessage={boardMessage}
            onSuccess={modalService.closeModal}
            onFail={handleFail}
            initialValues={values}
          />
        </FormContainer>,
      );
    },
    [boardMessage],
  );

  const handleFormOpen = useCallback(() => {
    modalService.openModal(
      <FormContainer modal>
        <NetBoardForm
          boardMessage={boardMessage}
          onSuccess={modalService.closeModal}
          onFail={handleFail}
        />
      </FormContainer>,
    );
  }, [boardMessage, handleFail]);

  return [handleFormOpen];
};
