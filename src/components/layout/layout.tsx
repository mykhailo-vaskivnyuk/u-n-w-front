import React, { FC, useEffect, useState } from 'react';
import { AppState } from '@api/constants';
import { app } from '@api/client.app';
import { Header } from '@components/header/header';
import { Content } from '@components/content/content';
import { Footer } from '@components/footer/footer';
import { ModalSet } from '@components/modal/modal.set';
import { Loading } from '@components/loading/loading';
import { useStyles } from './layout.styles';

export const Layout: FC = () => {
  const { root } = useStyles();
  const [state, setState] = useState<AppState>(AppState.INIT);

  useEffect(() => {
    const handler = (data: any) => setState(data);
    app.on('statechanged', handler);
    app.init();
    return app.remove('statechanged', handler);
  }, []);

  if (state === AppState.INIT) {
    return (
      <div className={root}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={root}>
      {state === AppState.LOADING && <Loading />}
      <Header />
      <Content />
      <Footer />
      <ModalSet />
    </div>
  );
};
