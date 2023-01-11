import { Palette } from '@styles/types';
import Color from 'color';

const getColor = (color: string) => (value?: number) => {
  if (!value || value === 100) return color;
  if (value < 100)
    return Color(color)
      .lighten((100 - value) / 100)
      .hex();
  return Color(color)
    .darken((value - 100) / 100)
    .hex();
};

const first = getColor('#2e7bb3'); // #068408
const second = getColor('#fc7b03'); // #b90909
const add = getColor('#119636'); // #ef6c1a
const light = getColor('#ffffff');
const dark = getColor('#3f4141');
const bg = getColor('#f1f4f0');

const palette: Palette = {
  first: {
    extraLight: first(25),
    light: first(50),
    medium: first(75),
    main: first(),
    dark: first(125),
    extraDark: first(150),
  },

  second: {
    extraLight: second(25),
    light: second(50),
    medium: second(75),
    main: second(),
    dark: second(125),
    extraDark: second(150),
  },

  add: {
    extraLight: add(25),
    light: add(50),
    medium: add(75),
    main: add(),
    dark: add(125),
    extraDark: add(150),
  },

  bg: {
    light: light(),
    main: bg(),
    dark: dark(),
    first: first(),
    second: second(),
    add: add(),
    disabled: light(110),
  },

  font: {
    first: first(),
    second: second(),
    add: add(),
    light: light(),
    dark: dark(),
  },

  light: {
    main: light(),
  },

  dark: {
    extraLight: dark(25),
    light: dark(50),
    medium: dark(75),
    main: dark(),
    dark: dark(125),
  },
};

export { palette };
