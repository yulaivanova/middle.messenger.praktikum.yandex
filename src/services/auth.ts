import {authAPI} from 'api/auth';
import {UserDTO, DispatchStateHandler} from 'api/types';
import type { Dispatch } from 'core';
import { transformUser, apiHasError } from 'utils';
import {getChat} from './chat';
import {getAvatarPath} from './profile';
import MessagesController from './messages';

type LoginPayload = {
  login: string;
  password: string;
};

type SignupPayload = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
};

export const signup: DispatchStateHandler<SignupPayload> = async (dispatch, state, action) => {
  const response = await authAPI.signup(action);

  if (apiHasError(response)) {
    dispatch({isLoading: false, loginFormError: response.reason});
    return;
  }

  const responseUser = await authAPI.me();

  dispatch({isLoading: false, loginFormError: null});

  if (apiHasError(response)) {
    dispatch(logout);
    return;
  }
  const avatarUrl = '../assets/img/profile.png';
  dispatch({user: transformUser(responseUser as UserDTO), avatarPath: avatarUrl});

  window.router.go('/chat');
};

export const login: DispatchStateHandler<LoginPayload> = async (dispatch, state, action,) => {
  const response = await authAPI.login(action);

  if (apiHasError(response)) {
    dispatch({isLoading: false, loginFormError: response.reason});
    return;
  }

  const responseUser = await authAPI.me();

  dispatch({isLoading: false, loginFormError: null});

  if (apiHasError(responseUser)) {
    dispatch(logout);
    return;
  }

  const userData = transformUser(responseUser as UserDTO);
  dispatch({user: userData});

  if (!userData.avatar) {
    const url = '../assets/img/profile.png';
    dispatch({avatarPath: url});
  } else {
    const avatarResponse = getAvatarPath(userData.avatar);
    dispatch({avatarPath: avatarResponse});
  }

  dispatch(getChat);

  setTimeout(() => {
    window.router.go('/chat');
  },600);
};

export const logout = async (dispatch: Dispatch<AppState>) => {
  await authAPI.logout();

  dispatch({isLoading: false, user: null, avatarPath: null, activeChat: null, activeMessages: null, messages: null, chats: null});
  MessagesController.closeAll();

  window.router.go('/');
};
