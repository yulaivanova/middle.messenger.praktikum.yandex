import Block from 'core/Block';
import {withChats, withRouter, withStore} from '../../utils';
import {Store} from '../../core';
import {Message} from '../../api/types';

interface ChatItemProps {
  store: Store<AppState>;
  text?: string;
  time?: string;
  imgPath?: string;
  badge?: string;
  name?: string;
  user?: boolean;
  id?: string;
  onClick?: () => void;
}

class ChatItem extends Block<ChatItemProps> {

  static componentName = 'ChatItem';
  constructor({...props}: ChatItemProps) {
    super({
      ...props,
      events: {
        click: () => this.onClick(),
      },
    });
  }

  onClick() {
    this.props.store.dispatch({activeChat: this.props.id});
    const allMessages = this.props.store.getState().messages;
    if (allMessages?.length) {
      const activeMessages: Message[] | null | Message = allMessages.filter((item) => item.chat_id === this.props.id);
      this.props.store.dispatch({activeMessages: activeMessages});
    }

    const chatHeader = document.querySelector('.chat__header');
    chatHeader.classList.add('is-active');
  }


  protected render(): string {
    // language=hbs
    return `
        <div class="chat-item" id={{id}}>
            <div class="chat-item__img">
                <img src="{{imgPath}}" alt="user-photo">
            </div>
            <div class="chat-item__content">
                <div class="chat-item__header">
                    <p class="chat-item__title">{{name}}</p>
                    <p class="chat-item__message-time">{{time}}</p>
                </div>
                <p class="chat-item__subtitle">
                {{#if text}}
                    {{#if text.user}}
                        <span>{{text.user.first_name}}:</span>
                    {{/if}}
                    {{text.content}}
                {{/if}}
                </p>
                {{#if badge}}
                    <div class="chat-item__badge">{{badge}}</div>
                {{/if}}
            </div>
        </div>

        <button type="{{type}}" class="button {{#if mod}}button--{{mod}}{{/if}} {{#if class}}{{class}}{{/if}}">{{text}}</button>
    `;
  }
}

const ComposedChatItem = withStore(ChatItem);

export {ComposedChatItem as ChatItem};
