import React, { FC } from 'react';
import { IconButton } from '@components/buttons/icon.button/icon.button';
import { ICONS } from '@components/icon/icon';
import { IWaitNets } from '@app/common/server/types/net.types';
import { OmitNull } from '@app/common/server/types/common.types';
import { useStyles } from './wait.item.styles';

export const WaitItem: FC<OmitNull<IWaitNets[number]>> = (props) => {
  const { root, button, icon } = useStyles();
  const { net_id: netId, name } = props;

  return (
    <li className={root}>
      {name}
      <IconButton
        key={netId}
        className={button}
        icon={ICONS.remove}
        iconPosition="right"
        classNameIcon={icon}
      />
    </li>
  );
};
