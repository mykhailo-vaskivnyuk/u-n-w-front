import { CSSProperties as Properties } from 'react';
import { ScalesStyleConfig } from '@styles/scales';

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
  borderRadius: BorderRadiusVarsType;
  zIndex: ZIndexVarsType;
  boxShadow: BoxShadowVarsType;
}

export type FontVarsType = {
  main: string;
  proxima: string;
};

export type FontSizeVarsType = {
  main: number;
  extraSmall: number;
  small: number;
  medium: number;
  large: number;
  extraLarge: number;
};

export type FontWeightVarsType = {
  main: number;
  hairline: number;
  thin: number;
  light: number;
  regular: number;
  medium: number;
  semiBold: number;
  bold: number;
  heavy: number;
  black: number;
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
  long: string;
  longer: string;
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
  l: number;
  // m_to_l: number;
  m: number;
  // m_to_s: number;
  s: number;

  maxContentWidth: number;
  maxContentLayoutWidth: number;
};

export type HeightVarsType = {
  l: number;
  m: number;
  s: number;
};

export type GapVarsType = {
  main: string;
  extraSmall: string;
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
  doubleExtraLarge: string;
};

export type BorderRadiusVarsType = {
  main: string;
  button: string;
};

export type ZIndexVarsType = {
  paginationButtons: number;
  galleryViewer: number;
  backdrop: number;
  popup: number;
  modal: number;
};

export type BoxShadowVarsType = {
  box: string;
  button: string;
};

/* ===================== Breakpoints declare ========================== */
export type Breakpoint = 's_800_s' | 's_800' | 'm_1024' | 'l_1366';
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

  l_1366: string;
  m_1024: string;
  s_800: string;
  s_800_s: string;
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
  main: string;
  extraDark?: string;
  dark?: string;
  medToDark?: string;
  medium?: string;
  medToLight?: string;
  light?: string;
  extraLight?: string;
}

export interface BackgroundColor {
  main: string;
  dark: string;
  light: string;
  disabled?: string;
  backdrop?: string;
}

export interface Palette {
  cm_primary: PaletteColor;
  cm_secondary: PaletteColor;
  cm_background: BackgroundColor;

  cm_orange: PaletteColor;
  cm_grey: PaletteColor;
  cm_red: PaletteColor;
  cm_green: PaletteColor;
  cm_light: PaletteColor;
  cm_dark: PaletteColor;
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