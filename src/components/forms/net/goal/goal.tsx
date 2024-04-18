import React, { FC, FormEvent } from 'react';
import { Formik, useFormikContext } from 'formik';
import { modalService } from '@services/modal.service';
import { app } from '@client/app';
import { TextArea } from '@components/controls/textarea/textarea';
import { Button } from '@components/buttons/button/button';
import { NetGoalField, NetGoalFormValues, NetGoalSchema } from './goal.schema';
import { useStyles } from './goal.styles';

const FormikProvider = Formik<NetGoalFormValues>;
const showSuccess = () => modalService.showMessage('SUCCESS');
const showFail = () => modalService.showError('FAIL');

const NetGoal: FC = () => {
  const { buttons } = useStyles();
  const { submitForm, values } = useFormikContext<NetGoalFormValues>();
  const { net, userNetData } = app.getState();

  const { parent_node_id: parentNodeId } = userNetData!;
  const { goal, total_count_of_members: countOfMembers } = net!;
  const changed = goal !== values[NetGoalField.GOAL];
  const editable = parentNodeId === null && countOfMembers === 1;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <form onSubmit={handleSubmit}>
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
