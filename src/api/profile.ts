import {HTTPTransport} from '../helpers/fetch';
import {BASE_URL} from './vars';

type ProfileRequestData = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
}

type PasswordRequestData = {
  oldPassword: string,
  newPassword: string
}

type AvatarRequestData = {
  [key: string] :string
}

export const profileAPI = {
  profile: (userData: ProfileRequestData) => {
    return new HTTPTransport().put(`${BASE_URL}/user/profile`, {
      headers: {'Content-Type': 'application/json'}, data: userData});
  },
  password: (userData: PasswordRequestData) => {
    return new HTTPTransport().put(`${BASE_URL}/user/password`, {
      headers: {'Content-Type': 'application/json'}, data: userData});
  },
  avatar: (userData: AvatarRequestData) => {
    return new HTTPTransport().put(`${BASE_URL}/user/profile/avatar`, {
      headers: {'accept': 'application/json'}, data: userData});
  },
};
