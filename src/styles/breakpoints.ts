import { Breakpoint, Breakpoints, BreakpointValues } from '@styles/types';
import { vars } from './vars';

const { l, m, s } = vars.width;
// eslint-disable-next-line
const { l: h_l, m: h_m, s: h_s } = vars.height;

/**
 * creates custom breakpoint options for createBreakpoints function
 */
function createBreakpoints(): Breakpoints {
  const values: BreakpointValues = {
    s_800_s: s,
    s_800: s,
    m_1024: m,
    l_1366: l,
  };
  const keys: Breakpoint[] = Object.keys(values) as Breakpoint[];
  const unit = 'px';
  const step = 5;

  /* standard material-ui v.4 breakpoint functions overridden to use a custom "keys" parameter */
  function up(key: Breakpoint | number) {
    // @ts-ignore
    const value = typeof values[key] === 'number' ? values[key] : key;
    return `@media (min-width:${value}${unit})`;
  }

  function down(key: Breakpoint | number) {
    // @ts-ignore
    const endIndex = keys.indexOf(key) + 1;
    const upperbound = values[keys[endIndex]];

    if (endIndex === keys.length) {
      return up('s_800_s');
    }

    const value = typeof upperbound === 'number' && endIndex > 0 ? upperbound : key;
    // @ts-ignore
    return `@media (max-width:${value - step / 100}${unit})`;
  }

  function between(start: Breakpoint | number, end: Breakpoint | number) {
    // @ts-ignore
    const endIndex = keys.indexOf(end);

    if (endIndex === keys.length - 1) {
      return up(start);
    }

    // @ts-ignore
    return (
      `@media (min-width:${
        // @ts-ignore
        typeof values[start] === 'number' ? values[start] : start
      }${unit}) and ` +
      `(max-width:${
        // @ts-ignore
        (endIndex !== -1 && typeof values[keys[endIndex + 1]] === 'number'
          ? values[keys[endIndex + 1]]
          : end) -
        step / 100
      }${unit})`
    );
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
    l_1366: downInclusive(values.l_1366),
    m_1024: downInclusive(values.m_1024),
    s_800: downInclusive(values.s_800),

    s_800_s: `${downInclusive(values.s_800_s)} and (max-height: ${h_s}${unit})`,
  };
}

const breakpoints = createBreakpoints();

export { breakpoints };
