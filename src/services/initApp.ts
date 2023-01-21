import type {Dispatch} from 'core';
import {Chats, UserDTO} from 'api/types';
import {authAPI} from 'api/auth';
import {transformUser, apiHasError} from 'utils';
import {getAvatarPath} from '../services/profile';
import {getChat} from './chat';
import {chatAPI} from '../api/chat';

export async function initApp(dispatch: Dispatch<AppState>) {

  // Ручкая задержка для демонстрации загрузочного экрана
  await new Promise(r => setTimeout(r, 700));

  try {
    const response = await authAPI.me();

    if (apiHasError(response)) {
      return;
    }

    const userData = transformUser(response as UserDTO);

    dispatch({user: userData});


    if (!userData.avatar) {
      const url = new URL('../assets/img/profile.png', import.meta.url).href;
      dispatch({avatarPath: url});
    } else {
      const avatarResponse = getAvatarPath(userData.avatar);
      dispatch({avatarPath: avatarResponse});
    }

  } catch (err) {
    console.error(err);
  } finally {
    dispatch({appIsInited: true});
    dispatch(getChat);
  }
}
