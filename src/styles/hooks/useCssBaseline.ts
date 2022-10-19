import { createUseStyles } from 'react-jss';
// import {
//   proximaNovaBold,
//   proximaNovaBoldItalic,
//   proximaNovaLight,
//   proximaNovaLightItalic,
//   proximaNovaRegular,
//   proximaNovaRegularItalic,
//   proximaNovaSemiBold,
//   proximaNovaSemiBoldItalic,
// } from '@styles/fonts';
import { palette } from '@styles/palette';
import { vars } from '@styles/vars';
import { mixins } from '@styles/mixins';
import { breakpoints } from '@styles/breakpoints';

export const useCssBaseline = createUseStyles(
  {
    // @ts-ignore
    '@global': {
      // '@font-face': [
      //   proximaNovaLight,
      //   proximaNovaLightItalic,
      //   proximaNovaRegular,
      //   proximaNovaRegularItalic,
      //   proximaNovaSemiBold,
      //   proximaNovaSemiBoldItalic,
      //   proximaNovaBold,
      //   proximaNovaBoldItalic,
      // ],

      /* =========================== reset section ======================= */
      // Default
      [`html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, 
				address, big, cite, code,	del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var,
				b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend,	table, caption, tbody, tfoot, thead, 
				tr, th, td,	article, aside, canvas, details, embed,	figure, figcaption, footer, header, hgroup,	menu, nav, 
				output, ruby, section, summary,	time, mark, audio, video`]: {
        margin: 0,
        padding: 0,
        fontSize: '100%',
        verticalAlign: 'baseline',
      },

      // Links
      a: {
        textDecoration: 'none',
        '&:focus, &:active, &:hover': {
          outline: 0,
          outlineOffset: 0,
        },
      },

      // List
      'ul, li': {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
      },

      // Headlines
      'h1, h2, h3, h4, h5, h6': {
        fontSize: '100%',
        fontWeight: 'normal',
      },

      // Default
      '*, *:before, *:after, html': {
        boxSizing: 'border-box',
      },
      ':focus': {
        outline: 0,
      },
      'img, audio, video': {
        maxWidth: '100%',
        height: 'auto',
      },
      'audio, canvas, iframe, video, img, svg': {
        verticalAlign: 'middle',
      },
      iframe: {
        border: 0,
      },

      // Form
      textarea: {
        resize: 'none' /* remove the resize handle on the bottom right */,
        overflow: 'auto',
        verticalAlign: 'top',
        boxShadow: 'none',
        '-webkit-box-shadow': 'none',
        '-moz-box-shadow': 'none',
      },
      'input, textarea, select, button': {
        outline: 'none',
        border: 'none',
        fontSize: '100%',
        margin: 0,
      },
      'button, input': {
        lineHeight: 'normal',
      },

      // Table
      table: {
        borderCollapse: 'collapse',
        borderSpacing: 0,
      },
      'td, th': {
        padding: 0,
        textAlign: 'left',
      },

      /* =========================== index section ======================= */
      'html, body, #__next': {
        width: '100%',
        height: '100%',
      },

      form: {
        width: '100%',
      },

      'a:link, a:visited': {
        color: 'currentColor',
      },
      'a:hover': {
        cursor: 'pointer',
      },

      body: {
        backgroundColor: palette.cm_background.light,
        fontFamily: vars.font.main,
        fontSize: vars.fontSize.main,
        lineHeight: vars.lineHeight.main,
        fontWeight: vars.fontWeight.main,
        color: palette.cm_dark.main,
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
      },

      /* remove arrows/spinners from input type number */
      /* Chrome, Safari, Edge, Opera */
      'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
      /* Firefox */
      'input[type=number]': {
        '-moz-appearance': 'textfield',
      },

      // '::-webkit-scrollbar': {
      //   ...mixins.size(50),
      //   [breakpoints.s_800]: {
      //     ...mixins.size(40),
      //   },
      // },
      // '::-webkit-scrollbar-track': {
      //   backgroundColor: palette.cm_secondary.medToDark,
      // },
      // '::-webkit-scrollbar-thumb': {
      //   minHeight: 60,
      //   backgroundColor: palette.cm_light.main,
      //   background: `${palette.cm_light.main} url("./assets/images/thumb-border-active.svg") no-repeat -100px -100px`, // preload image for active state
      //   /* top | right | bottom | left */
      //   borderStyle: 'solid',
      //   /* <image> values */
      //   borderImageSource: 'url("./assets/images/thumb-border.svg")',
      //   /* top | right | bottom | left */
      //   borderImageWidth: '24px 8px 24px 8px',
      //   /* top | right | bottom | left */
      //   borderImageSlice: '24 8 24 8',
      //   /* top | right | bottom | left */
      //   // borderImageOutset: '0px 0px 0px 0px',
      //   /* vertical | horizontal (stretch | repeat | round | space) */
      //   borderImageRepeat: 'stretch',
      //   [breakpoints.s_800]: {
      //     borderImageWidth: '20px 8px 20px 8px',
      //   },
      //   '&:active': {
      //     backgroundColor: palette.cm_secondary.extraLight,
      //     borderImageSource: 'url("./assets/images/thumb-border-active.svg")',
      //   },
      // },

      '#root': {
        width: '100%',
        height: '100%',
        minWidth: 320,
        overflow: 'hidden',
      },
      '*': {
        userSelect: 'none',
        userDrag: 'none',
        boxSizing: 'border-box',
        outline: 'none',
        fontFamily: vars.font.main,
      },
    },
  },
  {
    name: 'useCssBaseline',
  },
);
