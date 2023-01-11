import {Block} from 'core';

export class ChatPage extends Block {
  render() {
    // language=hbs
    return `
        <section class="chat-block">
            {{{ChatList}}}
            {{{Chat name="Вадим"
            }}}
        </section>
    `;
  }
}
