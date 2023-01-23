import { profileAPI } from 'api/profile';
import type { Dispatch } from 'core';
import { transformUser, apiHasError } from 'utils';
import { UserDTO } from 'api/types';
import {BASE_URL} from 'api/vars';


type ProfilePayload = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
};

type PasswordPayload = {
  oldPassword: string,
  newPassword: string
}

type AvatarPayload = FormData;
export const changeUserProfile = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: ProfilePayload
) => {
  const response = await profileAPI.profile(action);

  if (apiHasError(response)) {
    dispatch({loginFormError: response.reason});
    return;
  }

  dispatch({isSettings: true, user: transformUser(response as UserDTO)});
};
export const changeUserPassword = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: PasswordPayload
) => {
  const response = await profileAPI.password(action);

  if (apiHasError(response)) {

    dispatch({loginFormError: response.reason});
    return;
  }

  dispatch({isSettings: true});
};

export const changeUserAvatar = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: AvatarPayload
) => {
  const response = await profileAPI.avatar(action);

  if (apiHasError(response)) {
    dispatch({fileFormError: response.reason});
    return;
  }

  const userData = transformUser(response as UserDTO);

  dispatch({user: userData});
  dispatch({isModal: false});

  const avatarResponse = getAvatarPath(userData.avatar);
  dispatch({avatarPath: avatarResponse});
};

export const getAvatarPath = (link: string) => {
  return link ? `${BASE_URL}/resources${link}` : null;
};
