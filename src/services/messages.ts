import WS, {WSEvents} from '../utils/WS';
import {getChat} from './chat';
import Message from 'typings/app';

class MessagesController {
  private sockets: Map<number, WS> = new Map();

  async connect(id: number, token: string) {
    if (this.sockets.has(id)) {
      return;
    }

    const userId = window.store.getState().user.id;
    const ws = new WS(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`);
    this.sockets.set(id, ws);
    await ws.connect();
    this.subscribe(ws, id);
    this.getOldMessages(id);
  }

  async sendMessage(id: number, message: string) {
    const socket = this.sockets.get(id);

    if (!socket) {
      throw new Error(`Chat ${id} is not connected`);
    }

    socket.send({
      type: 'message',
      content: message,
    });
  }

  getOldMessages(id: number) {
    const socket = this.sockets.get(id);

    if (!socket) {
      throw new Error(`Chat ${id} is not connected`);
    }

    socket.send({type: 'get old', content: '0'});
  }

  onMessage(messages: Message | Message[], id) {
    let messagesToAdd: Message[] = [];
    let res = {};

    if (!messages.chat_id) {
      messages.chat_id = id;
    }

    if (Array.isArray(messages)) {
      messagesToAdd = messages.reverse();
    } else {
      messagesToAdd.push(messages);
    }

    const currentMessages = (window.store.getState().messages) || [];
    res = [...currentMessages, ...messagesToAdd];

    window.store.dispatch({messages: res});
    window.store.dispatch(getChat);

    if (window.store.getState().activeChat) {
      setTimeout(() => {
        const allMessages = window.store.getState().messages;
        if (allMessages?.length) {
          const activeMessagesList: Message[] | null | Message = allMessages.filter((item) => item.chat_id === id);
          window.store.dispatch({activeMessages: activeMessagesList});
          const elements = document.querySelectorAll('.chat__bubble');
          if (elements.length) {
            elements[elements.length - 1].scrollIntoView({behavior: 'smooth'});
          }
        }
      },1000);
    }
  }

  onClose(id: number) {
    this.sockets.delete(id);
  }

  closeAll() {
    Array.from(this.sockets.values()).forEach((socket) => socket.close());
  }

  subscribe(transport: WS, id: number) {
    transport.on(WSEvents.Message, (message: any) => this.onMessage(message, id));
    transport.on(WSEvents.Close, () => this.onClose(id));
  }
}

const messagesController = new MessagesController();

export default messagesController;
