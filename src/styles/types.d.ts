import { CSSProperties as Properties } from 'react';

export interface CSSProperties extends Properties {
  [k: string]: unknown | CSSProperties;
}

/* ===================== VARS TYPE ========================== */
export interface Vars {
  font: FontVarsType;
  fontSize: FontSizeVarsType;
  fontWeight: FontWeightVarsType;
  lineHeight: LineHeightVarsType;
  transition: TransitionVarsType;
  cubicBezier: CubicBezierVarsType;
  width: WidthVarsType;
  height: HeightVarsType;
  gap: GapVarsType;
  radius: BorderRadiusVarsType;
  zIndex: ZIndexVarsType;
  boxShadow: BoxShadowVarsType;
  opacityA: OpacityAVarsType;
  letterGap: LetterGapType;
}

export type FontVarsType = {
  main: string;
};

export type FontSizeVarsType = {
  SS: number;
  S: number;
  main: number;
  M: number;
  L: number;
  XL: number;
  XXL: number;
};

export type FontWeightVarsType = {
  light: number;
  regular: number;
  semiBold: number;
  bold: number;
};

export type LineHeightVarsType = {
  main: number;
  dense: number;
  regular: number;
  sparse: number;
  double: number;
  extraSparse: number;
};

export type TransitionVarsType = {
  quick: string;
  normal: string;
  smooth: string;
  L: string;
  XL: string;
  XXL: string;
};

export type CubicBezierVarsType = {
  easeInCirc: string;
  easeOutCirc: string;
  easeInOutCirc: string;
  easeInBack: string;
  easeOutBack: string;
  easeInOutBack: string;
};

export type WidthVarsType = {
  maxWidth: number;
  minWidth: number;
};

export type HeightVarsType = {
  minHeight: number;
};

export type GapVarsType = {
  SS: string;
  S: string;
  main: string;
  M: string;
  L: string;
  XL: string;
  XXL: string;
};

export type BorderRadiusVarsType = {
  SS: string;
  S: string;
  main: string;
};

export type ZIndexVarsType = {
  loading: number;
  modal: number;
};

export type BoxShadowVarsType = {
  box: string;
  button: string;
};

export type OpacityAVarsType = {
  extraLight: string;
  light: string;
  medium: string;
  main: string;
  dark: string;
  extraDark: string;
};

export type LetterGapType = {
  M: number;
  L: number;
  XL: number;
  XXL: number;
};

/* ===================== Breakpoints declare ========================== */
export type Breakpoint = 'maxWidth';
export type BreakpointValues = { [key in Breakpoint]: number };

export interface Breakpoints {
  unit: string;
  step: number;

  keys: Breakpoint[];
  values: BreakpointValues;
  up: (key: Breakpoint | number) => string;
  down: (key: Breakpoint | number) => string;
  between: (start: Breakpoint | number, end: Breakpoint | number) => string;
  only: (key: Breakpoint) => string;

  downInclusive: (key: number) => string;

  maxWidth: string;
  minHeight: string;
}

/* ===================== Mixins declare ========================== */
export interface Mixins {
  size: (width_height: number | string, height?: number | string) => CSSProperties;
  flexCenter: CSSProperties;
  absoluteCenter: CSSProperties;
  clearFix: CSSProperties;
  oneLineOverflow: (maxWidth?: number | string) => CSSProperties;
  multiLinesOverflow: (linesToShow: number, fontSize: number, lineHeight: number) => CSSProperties;
  setCustomScrollbar: (
    width?: number,
    height?: number,
    thumbBorderRadius?: number,
    trackBgHex?: string,
    thumbBgHex?: string,
  ) => CSSProperties;
}

/* ===================== Palette declare ========================== */
export interface PaletteColor {
  extraLight?: string;
  light?: string;
  medium?: string;
  main: string;
  dark?: string;
  extraDark?: string;
}

export interface BackgroundColor {
  light: string;
  main: string;
  dark: string;
  disabled?: string;
  first: string;
  second: string;
  add: string;
}

export interface FontColor {
  light: string;
  dark: string;
  first: string;
  second: string;
  add: string;
}

export interface Palette {
  first: PaletteColor;
  second: PaletteColor;
  add: PaletteColor;
  light: PaletteColor;
  dark: PaletteColor;
  bg: BackgroundColor;
  font: FontColor;
}

/* ===================== Theme declare ========================== */
declare global {
  namespace Jss {
    export interface Theme {
      palette: Palette;
      mixins: Mixins;
      breakpoints: Breakpoints;
      vars: Vars;
    }
  }
}
