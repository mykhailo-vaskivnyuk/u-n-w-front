import type { Classes } from 'jss';

export const mergeClasses = (baseClasses: Classes, additionalClasses: Classes = {}): Classes => {
  const combinedClasses = { ...baseClasses };

  for (const name of Object.keys(additionalClasses)) {
    combinedClasses[name] = `${combinedClasses[name] || ''} ${additionalClasses[name]}`.trimStart();
  }

  return combinedClasses;
};
