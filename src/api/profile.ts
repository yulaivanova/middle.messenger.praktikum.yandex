import {HTTPTransport} from '../helpers/fetch';

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
    return new HTTPTransport().put('https://ya-praktikum.tech/api/v2/user/profile', {
      headers: {'Content-Type': 'application/json'}, data: userData});
  },
  password: (userData: PasswordRequestData) => {
    return new HTTPTransport().put('https://ya-praktikum.tech/api/v2/user/password', {
      headers: {'Content-Type': 'application/json'}, data: userData});
  },
  avatar: (userData: AvatarRequestData) => {
    return new HTTPTransport().put('https://ya-praktikum.tech/api/v2/user/profile/avatar', {
      headers: {'accept': 'application/json'}, data: userData});
  },
};
