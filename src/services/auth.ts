import { authAPI } from 'api/auth';
import { UserDTO } from 'api/types';
import type { Dispatch } from 'core';
import { transformUser, apiHasError } from 'utils';

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

export const signup = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: SignupPayload
) => {
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
  const avatarUrl = new URL('../assets/img/profile.png', import.meta.url).href;
  dispatch({user: transformUser(responseUser as UserDTO), avatarPath: avatarUrl});

  window.router.go('/chat');
};

export const login = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: LoginPayload,
) => {
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

  dispatch({user: transformUser(responseUser as UserDTO)});

  window.router.go('/chat');
};

export const logout = async (dispatch: Dispatch<AppState>) => {
  await authAPI.logout();

  dispatch({isLoading: false, user: null, avatarPath: null});

  window.router.go('/');
};
