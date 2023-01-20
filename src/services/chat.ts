import {Dispatch} from '../core';
import {chatAPI} from '../api/chat';
import {apiHasError} from '../utils';
import {Chats} from '../api/types';
import MessagesController from './messages';

type ChatTitle = {
  title: string,
}

type NewUserData = {
  users: number[],
  chatId: number
}


export const createChat = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: ChatTitle
) => {
  const response = await chatAPI.create(action);

  if (apiHasError(response)) {
    return;
  }

  const responseChats = await chatAPI.getChats();

  if (apiHasError(responseChats)) {
    return;
  }

  dispatch({chats: responseChats as Chats[]});
};

export const getChat = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
) => {
  const response = await chatAPI.getChats();

  if (apiHasError(response)) {
    return;
  }

  dispatch({chats: response as Chats[]});

  response.map(async(chat) => {
    const tokenResponse = await chatAPI.getToken(chat.id);
    await MessagesController.connect(chat.id, tokenResponse.token);
  });
};

export const addUser = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: NewUserData
) => {
  const response = await chatAPI.addUser(action);

  if (apiHasError(response)) {
    dispatch({fileFormError: response.reason, isLoginModal: true});
    return;
  }

  dispatch({fileFormError: null, isLoginModal: false});
};


