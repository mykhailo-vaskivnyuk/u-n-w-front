import React, { FC, useState } from 'react';
import { ICONS } from '@components/icon/icon';
import { IconButton } from '@components/buttons/icon.button/icon.button';
import { Modal } from '@components/modal/modal';
import { useStyles } from './header.styles';

export const Header: FC = () => {
  const { root, title, button } = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <div className={root}>
      <IconButton icon={ICONS.menu} onClick={() => setOpen(true)} className={button} />
      <div className={title}>header very long header very very long header</div>
      <Modal open={open} onClose={() => setOpen(false)} showCloseIcon />
    </div>
  );
};
