import { Vars } from './types';

const vars: Vars = {
  font: {
    main: "'Alumni Sans', Arial, sans-serif",
  },

  opacityA: {
    extraLight: 'f7',
    light: 'cc',
    medium: 'aa',
    main: '77',
    dark: '33',
    extraDark: '07',
  },

  fontSize: {
    SS: 12, // ?
    S: 16,
    main: 20,
    M: 24,
    L: 28,
    XL: 32,
    XXL: 48,
  },

  fontWeight: {
    light: 300,
    regular: 400,
    semiBold: 600,
    bold: 700,
  },

  lineHeight: {
    main: 1.6,
    dense: 1,
    regular: 1.25,
    sparse: 1.5,
    double: 2,
    extraSparse: 3,
  },

  transition: {
    quick: '0.2s',
    normal: '0.35s',
    smooth: '0.5s',
    L: '0.75s',
    XL: '1s',
    XXL: '3s',
  },

  cubicBezier: {
    easeInCirc: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
    easeOutCirc: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
    easeInOutCirc: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
    easeInBack: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
    easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    easeInOutBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  width: {
    l: 1366,
    m: 1024,
    s: 800,

    maxContentWidth: 936,
    maxContentLayoutWidth: 1366,
  },

  height: {
    l: 768,
    m: 600,
    s: 480,
  },

  gap: {
    main: '15px',
    extraSmall: '5px',
    small: '10px',
    medium: '20px',
    large: '25px',
    extraLarge: '30px',
    doubleExtraLarge: '40px',
  },

  borderRadius: {
    main: '5px',
    button: '12px 0px',
  },

  zIndex: {
    paginationButtons: 50,
    galleryViewer: 75,
    backdrop: 100,
    popup: 150,
    modal: 250,
  },

  boxShadow: {
    box: '0 15px 20px rgba(0, 0, 0, 0.13)',
    button: '0px 2px 4px rgba(0, 0, 0, 0.16)',
  },
};

export { vars };
