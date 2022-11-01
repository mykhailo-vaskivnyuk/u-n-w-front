import { createUseStyles } from 'react-jss';
import { palette } from '@styles/palette';
import { vars } from '@styles/vars';

export const useCssBaseline = createUseStyles(
  {
    // @ts-ignore
    '@global': {

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
        backgroundColor: palette.bg.light,
        fontFamily: vars.font.main,
        fontSize: vars.fontSize.main,
        fontWeight: vars.fontWeight.regular,
        color: palette.font.dark,
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

      '#root': {
        width: '100%',
        height: '100%',
        minWidth: vars.width.minWidth,
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
