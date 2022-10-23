import { useEffect, useRef } from 'react';

export const useMounting = () => {
  const mounting = useRef(true);
  useEffect(() => {
    mounting.current = false;
  }, []);
  return mounting;
};
