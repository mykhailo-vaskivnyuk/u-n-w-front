import Color from 'color';
import { Mixins } from '@styles/types';
import { vars } from './vars';
import { palette } from './palette';

const mixins: Mixins = {
  size: (width_height: number | string, height?: number | string) => ({
    width: width_height,
    height: height === undefined ? width_height : height,
  }),

  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  absoluteCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },

  clearFix: {
    zoom: 1,
    '&:before, &:after': {
      content: '',
      display: 'table',
    },
    '&:after': {
      clear: 'both',
    },
  },

  oneLineOverflow: (maxWidth: number | string = '100%') => ({
    maxWidth,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  }),

  multiLinesOverflow: (linesToShow: number, fontSize: number, lineHeight: number) => ({
    fontSize: `${fontSize}px`,
    lineHeight: `${fontSize * lineHeight}px`,
    // display: "block",
    display: '-webkit-box',
    maxHeight: `${fontSize * lineHeight * linesToShow}px`,
    '-webkit-line-clamp': linesToShow,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),

  setCustomScrollbar: (
    width: number = 6,
    height: number = 8,
    thumbBorderRadius: number = 4,
    trackBgHex: string = palette.bg.main,
    thumbBgHex: string = palette.bg.main,
  ) => ({
    /* custom scroll bar */
    '&::-webkit-scrollbar': {
      width: `${width}px`,
      height: `${height}px`,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: Color(trackBgHex).alpha(0).rgb().toString(),
      '&:hover': {
        backgroundColor: Color(trackBgHex).alpha(0.2).rgb().toString(),
      },
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: Color(thumbBgHex).darken(0.1),
      borderRadius: `${thumbBorderRadius}px`,
      '&:hover': {
        backgroundColor: Color(thumbBgHex).darken(0.2),
        transition: `background ${vars.transition.quick}`,
      },
    },
    /* custom scroll bar FIREFOX only */
    'scrollbar-color': `${Color(thumbBgHex).darken(0.1)} ${Color(trackBgHex)
      .alpha(0.5)
      .rgb()
      .toString()}`,
    'scrollbar-width': width < 14 ? 'thin' : 'auto',
  }),
};

export { mixins };
