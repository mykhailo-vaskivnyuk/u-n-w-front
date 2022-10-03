import Jss from 'react-jss';
import { mixins } from './mixins';
import { breakpoints } from './breakpoints';
import { palette } from './palette';
import { vars } from './vars';

function createCustomTheme(): Jss.Theme {
  return {
    palette,
    mixins,
    breakpoints,
    vars,
  };
}

const defaultTheme = createCustomTheme();

export { defaultTheme, createCustomTheme };
