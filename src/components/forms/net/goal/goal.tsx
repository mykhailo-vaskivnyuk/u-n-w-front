import React, { FC, FormEvent } from 'react';
import { Formik, useFormikContext } from 'formik';
import { MessagesMap } from '@constants/messages';
import { modalService } from '@services/modal.service';
import { app } from '@client/app';
import { makeUrl } from '@utils/format.utils';
import { InputSimple } from '@components/controls/input/input.simple';
import { TextArea } from '@components/controls/textarea/textarea';
import { Button } from '@components/buttons/button/button';
import { NetGoalField, NetGoalFormValues, NetGoalSchema } from './goal.schema';
import { useStyles } from './goal.styles';

const FormikProvider = Formik<NetGoalFormValues>;
const showSuccess = () => modalService.showMessage(MessagesMap.SUCCESS);
const showFail = () => modalService.showError('FAIL');

const NetGoal: FC = () => {
  const { buttons } = useStyles();
  const { submitForm, values } = useFormikContext<NetGoalFormValues>();
  const { net, userNetData } = app.getState();

  const { parent_node_id: parentNodeId } = userNetData!;
  const { goal, total_count_of_members: countOfMembers } = net!;
  const changed = goal !== values[NetGoalField.GOAL];
  const editable = parentNodeId === null && countOfMembers === 1;
  const url = makeUrl('/wait/connect/:token', net?.net_link || '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputSimple label="Запрошення" defaultValue={url} contentEditable={false} />
      <TextArea label="Мета спільноти" name={NetGoalField.GOAL} disabled={!editable} />
      <div className={buttons}>
        <Button
          type="submit"
          onClick={() => {}}
          btnType="secondary"
          disabled={!changed || !editable}
        >
          зберегти
        </Button>
      </div>
    </form>
  );
};

export const NetGoalForm = () => {
  const { net } = app.getState();
  const { goal } = net!;

  return (
    <FormikProvider
      initialValues={{ goal: goal || '' }}
      validationSchema={NetGoalSchema}
      onSubmit={async (values) => {
        await app.net
          .update(values)
          .then((newNet) => {
            if (!newNet) return showFail();
            showSuccess();
          })
          .catch(() => {});
      }}
    >
      <NetGoal />
    </FormikProvider>
  );
};
