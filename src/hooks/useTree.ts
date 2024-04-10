import { useEffect, useState } from 'react';
import { IMember } from '@client/types';
import { app } from '@client/app';

export const useTree = () => {
  const [tree, setTree] = useState<IMember[]>(() => app.getState().tree);

  useEffect(() => {
    app.on('tree', setTree);
    return () => app.remove('tree', setTree);
  }, []);

  return tree;
};
