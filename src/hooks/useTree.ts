import { useEffect, useState } from 'react';
import { IMemberResponse } from '@api/api/types/types';
import { app } from '@api/app/client.app';

export const useTree = () => {
  const [tree, setTree] = useState<IMemberResponse[]>(() => app.getState().tree);

  useEffect(() => {
    app.on('tree', setTree);
    return () => app.remove('tree', setTree);
  }, []);

  return tree;
};
