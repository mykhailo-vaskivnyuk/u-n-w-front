/* eslint-disable react/no-danger */
import React, { useCallback, useMemo } from 'react';
import { NetBoardFormValues } from '@components/forms/net/board/board.schema';
import { modalService } from '@services/modal.service';
import { useNet } from '@hooks/useNet';
import { app } from '@api/app/client.app';
import { FormContainer } from '@components/forms/form.container/form.container';
import { NetBoardeForm } from '@components/forms/net/board/board';

export const useNetBoard = () => {
  useNet();
  const { user, boardMessages } = app.getState();

  const boardMessage = useMemo(
    () => boardMessages.find(({ user_id: v }) => v === user!.user_id),
    [boardMessages, user],
  );

  const handleFail = useCallback(
    (values: NetBoardFormValues) => {
      modalService.closeModal();
      modalService.openModal(
        <FormContainer modal>
          <NetBoardeForm
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
        <NetBoardeForm
          boardMessage={boardMessage}
          onSuccess={modalService.closeModal}
          onFail={handleFail}
        />
      </FormContainer>,
    );
  }, [boardMessage, handleFail]);

  return [handleFormOpen];
};
