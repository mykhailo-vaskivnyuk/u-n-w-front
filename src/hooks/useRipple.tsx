import React, { useCallback, useMemo, CSSProperties, MouseEvent, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { ArrayMap } from '@utils/array.map.class';

const MINIMUM_RIPPLE_SIZE = 50;

export const useStyles = createUseStyles(
  {
    '@global': {
      '@keyframes useRippleAnimation': {
        from: {
          opacity: 0.95,
        },
        to: {
          transform: 'scale(7)',
          opacity: 0,
        },
      },
    },
    root: {
      display: 'block',
      position: 'absolute',
      background: '#FFA65F',
      borderRadius: '50%',
      opacity: 0,
      pointerEvents: 'none',
      animationName: 'useRippleAnimation',
      animationDuration: '0.75s',
    },
  },
  {
    name: 'UseRipple',
  },
);

const getStyle = (event: MouseEvent<HTMLElement>, style?: CSSProperties) => {
  const { clientX, clientY, currentTarget } = event;
  const { top, left, width, height } = currentTarget.getBoundingClientRect();
  const size = Math.min(width, height, MINIMUM_RIPPLE_SIZE);
  const offsetX = clientX - left - size / 2;
  const offsetY = clientY - top - size / 2;

  return {
    width: size,
    height: size,
    left: offsetX,
    top: offsetY,
    ...style,
  };
};

export const useRipples = (style?: CSSProperties) => {
  const [ripples, setRipples] = useState(() => new ArrayMap());
  const classes = useStyles();

  const showRipple = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      const ripple = {
        key: event.timeStamp,
        className: classes.root,
        style: getStyle(event, style),
        onAnimationEnd: () => setRipples((state) => state.remove(ripple)),
      };

      setRipples((state) => state.insert(ripple));
    },
    [classes.root, style],
  );

  return useMemo(
    // eslint-disable-next-line react/jsx-props-no-spreading
    () => [ripples.map((ripple) => <span {...ripple} />), showRipple] as const,
    [ripples, showRipple],
  );
};
