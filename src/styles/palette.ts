import { Palette } from '@styles/types';

// main shade of the color is formed from medium or dark based on the palette in figma
const palette: Palette = {
  cm_primary: {
    main: '#068408',
    // extraDark?: string;
    // dark?: string;
    medToDark: '#068408',
    medium: '#FF8522',
    medToLight: '#FFA65F',
    // light: '#FFA65F',
    // extraLight?: string;
  },
  cm_secondary: {
    main: '#b90909',
    dark: '#3f4141', // #393D3E (main design bg)
    medToDark: '#4B4B4B', // #4C5254 (scroll bar bg)
    medium: '#535353',
    medToLight: '#636363',
    light: '#929292', // my own, not in the design
    extraLight: '#C2C2C2',
  },
  cm_background: {
    main: '#f1f4f0',
    dark: '#3f4141',
    light: '#FFFFFF',
  },

  cm_orange: {
    main: '#FF8522',
    // extraDark?: string;
    // dark?: string;
    medToDark: '#EB7617',
    medium: '#FF8522',
    medToLight: '#FFA65F',
    // light: '#FFA65F',
    // extraLight?: string;
  },
  cm_grey: {
    main: '#3f4141',
    dark: '#3f4141', // #393D3E (main design bg)
    medToDark: '#4B4B4B', // #4C5254 (scroll bar bg)
    medium: '#535353',
    medToLight: '#636363',
    light: '#929292', // my own, not in the design
    extraLight: '#C2C2C2',
  },
  cm_green: {
    main: '#7AB929',
    medium: '#A4DC5C',
    medToLight: '#B3DC7E',
    light: '#E8F6D0',
    extraLight: '#EFF7E5',
  },
  cm_red: {
    main: '#EF4237',
    dark: '#CB0C00',
    medium: '#FF6A4A',
    medToLight: '#E5765F',
    light: '#FCE1DF',
  },
  cm_light: {
    main: '#FFFFFF',
  },
  cm_dark: {
    main: '#3f4141',
  },
};

export { palette };
