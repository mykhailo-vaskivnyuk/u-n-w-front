import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RelativeRoutesMap } from '@constants/router.constants';
import { Main } from '@components/views/main/main';
import { About } from '@components/views/about/about';
import { Palette } from '@components/palette/palette';
import { Mail } from '@components/views/mail/mail';
import { NotFound } from '@components/views/not.found/not.found';
import { Redirect } from './redirect';
import { AccountRouter } from './routes/account.router';
import { NetRouter } from './routes/net.router';

export const Router: FC = () => {
  return (
    <>
      <Redirect />
      <Routes>
        <Route path={RelativeRoutesMap.ROOT} element={<Main />} />
        <Route path={RelativeRoutesMap.ABOUT} element={<About />} />
        {AccountRouter}
        {NetRouter}
        <Route path={RelativeRoutesMap.PALETTE} element={<Palette />} />
        <Route path={RelativeRoutesMap.MAIL} element={<Mail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
