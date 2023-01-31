import {HTTPTransport} from '../helpers/fetch';
import {BASE_URL} from './vars';

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
    try {
      return new HTTPTransport().post(`${BASE_URL}/auth/signup`, {
        headers: {'Content-Type': 'application/json'}, data: userData
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  login: (userData: LoginRequestData) => {
    try {
      return new HTTPTransport().post(`${BASE_URL}/auth/signin`, {
        headers: {'Content-Type': 'application/json'}, data: userData
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  me: () => {
    try {
      return new HTTPTransport().get(`${BASE_URL}/auth/user`, {headers: {'Content-Type': 'application/json'}});
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  logout: () => {
    try {
      return new HTTPTransport().post(`${BASE_URL}/auth/logout`, {headers: {'Content-Type': 'application/json'}});
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};
