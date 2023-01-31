import {Dispatch} from '../core';
import {chatAPI} from '../api/chat';
import {apiHasError} from '../utils';
import {Chats, DispatchStateHandler} from '../api/types';
import MessagesController from './messages';

type ChatTitle = {
  title: string,
}

type NewUserData = {
  users: string[],
  chatId: string
}

type ChatId = {
  chatId: string,
}

export const createChat: DispatchStateHandler<ChatTitle> = async (dispatch, state, action) => {
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

  response.map(async(chat) => {
    const tokenResponse = await chatAPI.getToken(chat.id);
    await MessagesController.connect(chat.id, tokenResponse.token);
  });

  dispatch({chats: response as Chats[]});
};

export const addUser: DispatchStateHandler<NewUserData> = async (dispatch, state, action) => {
  const response = await chatAPI.addUser(action);

  if (apiHasError(response)) {
    dispatch({fileFormError: response.reason, isLoginModal: true});
    return;
  }

  dispatch({fileFormError: null, isLoginModal: false});
};

export const deleteUser: DispatchStateHandler<NewUserData> = async (dispatch, state, action) => {
  const response = await chatAPI.deleteUser(action);

  if (apiHasError(response)) {
    dispatch({fileFormError: response.reason, isDelLoginModal: true});
    return;
  }

  dispatch({fileFormError: null, isDelLoginModal: false});
};

export const deleteChat: DispatchStateHandler<ChatId> = async (dispatch, state, action) => {
  const response = await chatAPI.deleteChat(action);

  if (apiHasError(response)) {
    console.log(response);
    return;
  }

  const responseChats = await chatAPI.getChats();

  if (apiHasError(responseChats)) {
    return;
  }

  dispatch({chats: responseChats as Chats[], activeChat: null, activeMessages: null});
};


