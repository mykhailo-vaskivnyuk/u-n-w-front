import React, { FC, PropsWithChildren } from 'react';
import { Header } from '@components/header/header';
import { Footer } from '@components/footer/footer';
import { NetMenu } from '@components/menu/net.menu/net.menu';
import { useStyles } from './layout.styles';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { root } = useStyles();

  return (
    <>
      <div className={root}>
        <Header />
        <NetMenu />
        {children}
        <Footer />
      </div>
      {/* <script
        async
        src="https://telegram.org/js/telegram-widget.js?22"
        data-telegram-login="u_n_w_bot"
        data-size="large"
        data-onauth="onTelegramAuth(user)"
        data-request-access="write"
      />
      <script type="text/javascript">
        {`
          function onTelegramAuth(user) {
            alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
          }
        `}
      </script> */}
    </>
  );
};
