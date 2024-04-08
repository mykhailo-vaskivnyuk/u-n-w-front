import { FC, memo, useEffect } from 'react';

export const Empty: FC = memo(() => {
  console.log('EMPTY', 'RENDER');
  useEffect(() => {
    console.log('EMPTY', 'MOUNT');
  }, []);
  return null;
});
