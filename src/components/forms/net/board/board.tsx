import React, { FC, FormEvent, useCallback } from 'react';
import { Formik, useFormikContext } from 'formik';
import { ITableBoardMessages } from '@app/local/db.types';
import { MessagesMap } from '@constants/messages';
import { modalService } from '@services/modal.service';
import { Button } from '@components/buttons/button/button';
import { TextArea } from '@components/controls/textarea/textarea';
import { app } from '@client/app';
import { NetBoardField, NetBoardFormValues, NetBoardSchema } from './board.schema';
import { useStyles } from './board.styles';

const FormikProvider = Formik<NetBoardFormValues>;
const showFail = () => modalService.showError(MessagesMap.BOARD_MESSAGE_SAVE_FAIL);

interface NetBoardFormProps {
  onSuccess: () => void;
  onFail: (values: NetBoardFormValues) => void;
  boardMessage?: ITableBoardMessages;
  initialValues?: NetBoardFormValues;
}

const NetBoard: FC = () => {
  const { buttons } = useStyles();
  const { submitForm, setFieldValue } = useFormikContext<NetBoardFormValues>();

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      submitForm();
    },
    [submitForm],
  );

  const handleClear = useCallback(() => {
    setFieldValue('message', '');
  }, [setFieldValue]);

  return (
    <form onSubmit={handleSubmit}>
      <TextArea name={NetBoardField.MESSAGE} />
      <div className={buttons}>
        <Button btnType="refuse" onClick={handleClear}>
          очистити
        </Button>
        <Button btnType="secondary" type="submit">
          ок
        </Button>
      </div>
    </form>
  );
};

export const NetBoardForm: FC<NetBoardFormProps> = (props) => {
  const { boardMessage, onSuccess, onFail, initialValues } = props;

  return (
    <FormikProvider
      initialValues={initialValues || boardMessage || { message: '' }}
      validationSchema={NetBoardSchema}
      onSubmit={(values) => {
        const { message: curMessage } = boardMessage || {};
        const { message: newMessage } = values;
        if (newMessage === curMessage) return onSuccess();
        app.net.board.persist(values).then((success) => {
          if (success) return onSuccess();
          showFail();
          onFail(values);
        });
      }}
    >
      <NetBoard />
    </FormikProvider>
  );
};
