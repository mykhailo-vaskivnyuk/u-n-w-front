import React, { FC } from 'react';
import { useStyles } from './mail.styles';

const TEXT =
  'Якщо ви реєструвалсь на сайті You & World - підтвердіть свій email. Для цього клікніть на лінк нижче.';
export const Mail: FC = () => {
  const { root, content, header, body, footer } = useStyles();

  return (
    <div className={root}>
      <div className={content}>
        <div className={header}>YOU & WORLD</div>
        <div className={body}>
          <p>{TEXT}</p>
          <a href="/#">ПІДТВЕРДИТИ</a>
        </div>
        <div className={footer} />
      </div>
    </div>
  );
};
