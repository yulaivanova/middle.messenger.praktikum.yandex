import LoginPage from 'pages/login';
import SigninPage from 'pages/signin';
import ChatPage from 'pages/chat-page';
import {BlockClass} from 'core';
import ProfilePage from 'pages/profile-page';

export enum Screens {
  Login = 'login',
  Signin = 'signin',
  Chat = 'chat',
  Profile = 'profile'
}

const map: Record<Screens, BlockClass<any>> = {
  [Screens.Login]: LoginPage,
  [Screens.Signin]: SigninPage,
  [Screens.Chat]: ChatPage,
  [Screens.Profile]: ProfilePage,
};

export const getScreenComponent = (screen: Screens): BlockClass<any> => {
  return map[screen];
};
