import about from './icons/about.svg?raw';
import account from './icons/account.svg?raw';
import arrowDown from './icons/arrow.down.svg?raw';
import arrowLeft from './icons/arrow.left.svg?raw';
import arrowRight from './icons/arrow.right.svg?raw';
import arrowUp from './icons/arrow.up.svg?raw';
import board from './icons/board.svg?raw';
import create from './icons/create.svg?raw';
import cross from './icons/cross.svg?raw';
import dev from './icons/dev.svg?raw';
import goal from './icons/goal.svg?raw';
import home from './icons/home.svg?raw';
import login from './icons/login.svg?raw';
import logout from './icons/logout.svg?raw';
import menu from './icons/menu.svg?raw';
import message from './icons/message.svg?raw';
import net from './icons/net.svg?raw';
import notification from './icons/notification.svg?raw';
import post from './icons/post.svg?raw';
import remove from './icons/remove.svg?raw';
import rules from './icons/rules.svg?raw';
import spinner from './icons/spinner.svg?raw';
import telegram from './icons/telegram.svg?raw';
import wait from './icons/wait.svg?raw';

export const ICONS_MAP = {
  about,
  account,
  arrowDown,
  arrowLeft,
  arrowRight,
  arrowUp,
  board,
  create,
  cross,
  dev,
  goal,
  home,
  login,
  logout,
  menu,
  message,
  net,
  notification,
  post,
  remove,
  rules,
  spinner,
  telegram,
  wait,
};

export type ICONS = keyof typeof ICONS_MAP;
