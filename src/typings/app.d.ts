declare global {
    export type Nullable<T> = T | null;

    export type Keys<T extends Record<string, unknown>> = keyof T;
    export type Values<T extends Record<string, unknown>> = T[Keys<T>];

    export type Indexed = { [key: string]: any };

    export interface ChatInfo {
      id: number;
      title: string;
      avatar: string;
      unread_count: number;
      last_message: {
        user: User,
        time: string;
        content: string;
      }
    }

    export type User = {
      id: number;
      login: string;
      firstName: string;
      secondName: string;
      displayName: string;
      avatar: string;
      phone: string;
      email: string;
    };

  export interface Message {
    chat_id: number;
    time: string;
    type: string;
    user_id: number;
    content: string;
    file?: {
      id: number;
      user_id: number;
      path: string;
      filename: string;
      content_type: string;
      content_size: number;
      upload_date: string;
    }
  }

    export type AppState = {
      appIsInited: boolean;
      // eslint-disable-next-line no-undef
      screen: Screens | null;
      isLoading: boolean;
      loginFormError: string | null;
      fileFormError: string | null;
      isSettings: boolean;
      user: User | null;
      isModal: boolean;
      avatarPath: string | null;
      chats: ChatInfo[] | null;
      activeChat: string | null;
      isLoginModal: boolean;
      isDelLoginModal: boolean;
      messages: Message[] | null;
      activeMessages: Message[] | null;
    };
}

export {};
