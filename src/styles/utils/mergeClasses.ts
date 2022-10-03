import type { Classes } from 'jss';

export const mergeClasses = (baseClasses: Classes, additionalClasses: Classes): Classes => {
  const combinedClasses = { ...baseClasses };

  // eslint-disable-next-line guard-for-in
  for (const name in additionalClasses) {
    combinedClasses[name] =
      name in combinedClasses
        ? `${combinedClasses[name]} ${additionalClasses[name]}`
        : additionalClasses[name];
  }

  return combinedClasses;
};
