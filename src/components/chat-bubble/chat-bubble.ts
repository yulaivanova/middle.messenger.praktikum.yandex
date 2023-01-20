import Block from 'core/Block';

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
    // const date = parsDate(this.props.messageTime).day;
    // const { time } = parsDate(this.props.messageTime);
    const isMine = (this.props.messageAuthor === this.props.userId);
    // language=hbs
    return `
        <div class="chat__bubble{{#if ${isMine}}} chat__bubble--sended{{/if}}">
            {{messageText}}
            <span class="chat__time">
              <span class="chat__time-inner">11:56</span>
            </span>
        </div>
    `;
  }
}
