import { useEffect, useState } from 'react';

const getMatches = (query: string) =>
  typeof window !== 'undefined' ? window.matchMedia(query).matches : false;

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() => getMatches(query));

  useEffect(() => {
    const handleChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    const matchMedia = window.matchMedia(query);
    matchMedia.addEventListener('change', handleChange);
    return () => matchMedia.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};
