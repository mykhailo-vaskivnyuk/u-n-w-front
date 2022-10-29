import { Breakpoint, Breakpoints, BreakpointValues } from '@styles/types';
import { vars } from './vars';

const { maxWidth } = vars.width;

/**
 * creates custom breakpoint options for createBreakpoints function
 */
function createBreakpoints(): Breakpoints {
  const values: BreakpointValues = {
    maxWidth,
  };
  const keys: Breakpoint[] = Object.keys(values) as Breakpoint[];
  const unit = 'px';
  const step = 5;

  /* standard material-ui v.4 breakpoint functions overridden to use a custom "keys" parameter */
  function up(key: Breakpoint | number) {
    const value = typeof key === 'number' ? key : values[key];
    return `@media (min-width:${value}${unit})`;
  }

  function down(key: Breakpoint | number) {
    let value: number;
    if (typeof key === 'number') value = key;
    else {
      const endIndex = keys.indexOf(key) + 1;
      const upperbound = values[keys[endIndex]];

      if (endIndex === keys.length) {
        return up('maxWidth');
      }
      value = upperbound;
    }
    return `@media (max-width:${value - step / 100}${unit})`;
  }

  function between(start: Breakpoint | number, end: Breakpoint | number) {
    const min = up(start);
    const max = down(end);
    return `${min} and ${max.replace('@media ', '')}`;
  }

  function only(key: Breakpoint) {
    return between(key, key);
  }

  function downInclusive(value: number) {
    return `@media (max-width:${value}${unit})`;
  }

  return {
    unit,
    step,
    keys,
    values,

    up,
    down,
    only,
    between,

    downInclusive,
    maxWidth: up('maxWidth'),
  };
}

const breakpoints = createBreakpoints();

export { breakpoints };
