import {HTTPTransport} from '../helpers/fetch';

type ChatTitle = {
  title: string;
};

type NewUserData = {
  users: string[],
  chatId: string
}


export const chatAPI = {
  create(title: ChatTitle) {
    return new HTTPTransport().post('https://ya-praktikum.tech/api/v2/chats', {
      headers: {'Content-Type': 'application/json'}, data: title});
  },
  getChats() {
    return new HTTPTransport().get('https://ya-praktikum.tech/api/v2/chats', {
      headers: {'Content-Type': 'application/json'}});
  },

  addUser(userData: NewUserData) {
    return new HTTPTransport().put('https://ya-praktikum.tech/api/v2/chats/users', {
      headers: {'Content-Type': 'application/json'}, data: userData});
  },

  getToken(id: number) {
    return new HTTPTransport().post(`https://ya-praktikum.tech/api/v2/chats/token/${id}`, {headers: {'Content-Type': 'application/json'}});
  },
};
