export const format = (string: string, ...values: string[]) => {
  return values.reduce((result, value) => result.replace('%s', value), string);
};

export const makeDynamicPathname = (pathname: string, ...ids: (number | string)[]) =>
  ids.reduce((result: string, id) => result.replace(/:[^/]+/, id.toString()), pathname);

export const makeUrl = (pathToToken: string, token: string) => {
  const { origin } = window.location;
  const path = makeDynamicPathname(pathToToken, token);
  const url = `${origin}/#${path}`;
  return url;
};

export const makeInnerHtmlWithLinks = (text: string) => {
  const regExp = /(\b|\s)([^<>\s]+:\/\/[^<>\s]+)(\b|\s)/g;
  const tpl = "$1<a href='$2' target='_blank' rel='noopener noreferrer'>$2</a>$3";
  return text.replace(regExp, tpl);
};
