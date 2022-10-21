import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCssBaseline } from '@styles/hooks/useCssBaseline';
import modalService from '@services/modal.service';
import { Loading } from '@components/loading/loading';
import { Header } from '@components/header/header';
import { Content } from '@components/content/content';
import { Footer } from '@components/footer/footer';
import { Modal } from '@components/modal/modal';
import { ClientApp } from '../../api/client.app';
import { useStyles } from './app.styles';

export const App: FC = () => {
  useCssBaseline();
  const { root } = useStyles();
  const [modalContent, setModalContent] = useState<ReactElement | null>(null);
  const location = useLocation();
  useEffect(() => {
    const app = new ClientApp('http://localhost:8000/api');
    app.testRequest().catch(() => console.log('testRequestError'));
  }, []);

  useEffect(() => {
    modalService.setCallback(setModalContent);
  }, []);

  useEffect(() => {
    setModalContent(null);
  }, [location]);

  return (
    <div className={root}>
      {/* <Loading /> */}
      <Header />
      <Content />
      <Footer />
      <Modal open={Boolean(modalContent)} onClose={() => setModalContent(null)}>
        {modalContent}
      </Modal>
    </div>
  );
};
