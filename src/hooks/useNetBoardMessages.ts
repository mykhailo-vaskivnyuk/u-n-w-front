import { useEffect, useState } from 'react';
import { ITableBoardMessages } from '@app/local/imports';
import { app } from '@client/app';

export const useNetBoardMessages = () => {
  const [boardMessages, setBoardMessages] = useState<ITableBoardMessages[]>(
    () => app.getState().boardMessages,
  );

  useEffect(() => {
    app.on('board', setBoardMessages);
    return () => {
      app.remove('board', setBoardMessages);
    };
  }, []);

  return boardMessages;
};
