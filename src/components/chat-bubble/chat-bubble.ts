import Block from 'core/Block';
import {parseDate} from 'helpers/parseDate';

interface ChatBubbleProps {
  userId: () => number,
  message: {
    content: string,
    time: string,
    user_id: number,
    type: string,
  }
}

export class ChatBubble extends Block {
  static componentName = 'ChatBubble';
  constructor({userId, message}: ChatBubbleProps) {
    super({
      userId,
      messageText: message.content,
      messageTime: message.time,
      messageAuthor: message.user_id,
      type: message.type,
    });
  }

  protected render(): string {
    const time = parseDate(this.props.messageTime).time;
    const isMine = (this.props.messageAuthor === this.props.userId);
    const isInfo = (this.props.type === 'user connected');
    // language=hbs
    return `
        {{#if ${isInfo} }}
            <p class="chat__info">{{messageText}} user connected</p>
        {{else}}
        <div class="chat__bubble{{#if ${isMine}}} chat__bubble--sended{{/if}}">
            {{messageText}}
            <span class="chat__time">
              <span class="chat__time-inner">${time}</span>
            </span>
        </div>
        {{/if}}
    `;
  }
}
