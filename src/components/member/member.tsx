import React, { FC, useCallback } from 'react';
import { modalService } from '@services/modal.service';
import { useStyles } from './member.styles';

export interface MemberProps {
  name: string;
}

export const Member: FC<MemberProps> = (props) => {
  const { root, avatar } = useStyles();
  const { name } = props;

  const handleClick = useCallback(() => modalService.showMessage('HELLO'), []);

  return (
    <div className={root} onClick={handleClick} aria-hidden="true">
      <div className={avatar} />
      <div>{name}</div>
    </div>
  );
};
