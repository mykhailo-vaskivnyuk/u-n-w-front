import { Classes } from 'jss';

export const useCombineStyles = <T extends keyof any>(
  first: Classes<T>,
  second?: Partial<Classes<T>>,
) => {
  if (!second) return first;
  const combined = { ...first };
  Object.keys(combined).forEach((key) => {
    const cls = key as T;
    if (!second[cls]) return;
    combined[cls] = `${first[cls]} ${second[cls]}`;
  });

  return combined;
};
