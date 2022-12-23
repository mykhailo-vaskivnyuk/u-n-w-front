import { useEffect, useState } from 'react';
import { IMember } from '@project-types/member.types';
import { app } from '@api/app/client.app';

export const useTree = () => {
  const [tree, setTree] = useState<IMember[]>(() => app.getState().tree);

  useEffect(() => {
    app.on('tree', setTree);
    return () => app.remove('tree', setTree);
  }, []);

  return tree;
};
