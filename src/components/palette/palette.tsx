import React, { FC } from 'react';
import { createCustomTheme } from '@styles/theme';
import { useTheme } from 'react-jss';
import { useStyles } from './palette.styles';

const colorNames = ['extraLight', 'light', 'medium', 'main', 'dark', 'extraDark'] as const;
const colorNamesBg = ['light', 'main', 'dark'] as const;
const colorTypes = ['first', 'second', 'add'] as const;

export const Palette: FC = () => {
  const { root, color: clsColor } = useStyles();
  const theme = useTheme<ReturnType<typeof createCustomTheme>>();
  const jsx = colorTypes.map((type) => {
    return (
      <div key={type} className={clsColor}>
        {colorNames.map((color) => {
          return (
            <div key={`${type}-${color}`} style={{ background: theme?.palette[type][color] }}>
              {`${type}-${color}`}
            </div>
          );
        })}
      </div>
    );
  });

  const bgJsx = (
    <div className={clsColor}>
      {colorNamesBg.map((color) => {
        return (
          <div key={color} style={{ background: theme?.palette.bg[color] }}>
            {`bg-${color}`}
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      <div className={root}>{jsx}</div>
      <div className={root}>{bgJsx}</div>
    </>
  );
};
