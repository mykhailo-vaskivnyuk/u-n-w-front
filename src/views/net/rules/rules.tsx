/* eslint-disable react/no-array-index-key */
import React, { FC } from 'react';
import { RULES } from '@constants/rules';
import { FormContainer } from '@components/containers/form.container';
import { useStyles } from './rules.styles';

export const NetRules: FC = () => {
  const { root } = useStyles();
  return (
    <FormContainer title="Правила спільноти">
      <div className={root}>
        <ul>
          {RULES.map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ul>
      </div>
    </FormContainer>
  );
};
