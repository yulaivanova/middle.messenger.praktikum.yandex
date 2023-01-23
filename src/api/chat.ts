import {HTTPTransport} from '../helpers/fetch';
import {BASE_URL} from './vars';

type ChatTitle = {
  title: string;
};

type NewUserData = {
  users: string[],
  chatId: string
}

type ChatId = {
  chatId: string,
}


export const chatAPI = {
  create(title: ChatTitle) {
    try {
      return new HTTPTransport().post(`${BASE_URL}/chats`, {
        headers: {'Content-Type': 'application/json'}, data: title});
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  getChats() {
    try {
      return new HTTPTransport().get(`${BASE_URL}/chats`, {
        headers: {'Content-Type': 'application/json'}});
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  addUser(userData: NewUserData) {
    try {
      return new HTTPTransport().put(`${BASE_URL}/chats/users`, {
        headers: {'Content-Type': 'application/json'}, data: userData});
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  getToken(id: number) {
    try {
      return new HTTPTransport().post(`${BASE_URL}/chats/token/${id}`, {headers: {'Content-Type': 'application/json'}});
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  deleteUser(userData: NewUserData) {
    try {
      return new HTTPTransport().delete(`${BASE_URL}/chats/users`, {
        headers: {'Content-Type': 'application/json'}, data: userData});
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  deleteChat(chatId: ChatId) {
    try {
      return new HTTPTransport().delete(`${BASE_URL}/chats`, {
        headers: {'Content-Type': 'application/json'}, data: chatId});
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};
