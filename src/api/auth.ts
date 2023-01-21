import {HTTPTransport} from '../helpers/fetch';

type LoginRequestData = {
  login: string;
  password: string;
};

type SignupRequestData = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

export const authAPI = {
  signup: (userData: SignupRequestData) => {
    return new HTTPTransport().post('https://ya-praktikum.tech/api/v2/auth/signup', {
      headers: {'Content-Type': 'application/json'}, data: userData});
  },
  login: (userData: LoginRequestData) => {
    return new HTTPTransport().post('https://ya-praktikum.tech/api/v2/auth/signin', {
      headers: {'Content-Type': 'application/json'}, data: userData});
  },
  me: () => {
    return new HTTPTransport().get('https://ya-praktikum.tech/api/v2/auth/user', {
      headers: {'Content-Type': 'application/json'}});
  },
  logout: () => {
    return new HTTPTransport().post('https://ya-praktikum.tech/api/v2/auth/logout', {
      headers: {'Content-Type': 'application/json'}});
  },
};
