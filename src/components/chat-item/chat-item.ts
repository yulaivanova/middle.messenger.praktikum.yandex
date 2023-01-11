import Block from 'core/Block';

interface ChatItemProps {
  text?: string;
  time?: string;
  imgPath?: string;
  badge?: string;
  name?: string;
  user?: boolean;
}

export class ChatItem extends Block {

  static componentName = 'ChatItem';
  constructor({...props}: ChatItemProps) {
    super({...props});
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="chat-item">
            <div class="chat-item__img">
                <img src="{{imgPath}}" alt="user-photo">
            </div>
            <div class="chat-item__content">
                <div class="chat-item__header">
                    <p class="chat-item__title">{{name}}</p>
                    <p class="chat-item__message-time">{{time}}</p>
                </div>
                <p class="chat-item__subtitle">
                    {{#if user}}
                        <span>Вы</span>
                    {{/if}}
                    {{text}}
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
