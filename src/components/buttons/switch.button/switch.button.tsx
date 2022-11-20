import { vars } from '@styles/vars';
import React, { ButtonHTMLAttributes, ReactElement, useState } from 'react';
import { useStyles } from './switch.button.styles';

export interface ISwitchOption<T extends keyof any> {
  title: string;
  option: T;
}

interface SwitchButtonProps<T extends keyof any> {
  buttonProps: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> & {
    onChange: (option: T) => void;
    value: T;
  };
  options: ISwitchOption<T>[];
}

type TSwitchButton = <T extends keyof any>(props: SwitchButtonProps<T>) => ReactElement;

export const SwitchButton: TSwitchButton = (props) => {
  const { root, slider } = useStyles();
  const { buttonProps, options } = props;
  const { onChange, value, ...rest } = buttonProps;
  const [optionNumberMap] = useState<Record<string, number>>(() =>
    options.reduce((acc, { option }, i) => Object.assign(acc, { [option.toString()]: i }), {}),
  );
  const buttons = options.map(({ title, option }) => (
    <button key={option.toString()} type="button" onClick={() => onChange(option)} {...rest}>
      {title}
    </button>
  ));

  const count = options.length;
  const gap = Number.parseFloat(vars.gap.SS);
  const active = optionNumberMap[value.toString()];
  const style = {
    width: `calc(${100 / count}% - ${(gap * (count - 1)) / count}px)`,
    left: `calc(${(100 / count) * active}% - ${((gap * (count - 1)) / count) * active}px + ${
      gap * active
    }px)`,
  };

  return (
    <div className={root}>
      <div className={slider} style={style} />
      {buttons}
    </div>
  );
};
