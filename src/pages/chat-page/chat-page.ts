import {Block, CoreRouter, Store} from 'core';
import {withRouter, withStore} from 'utils';
import {createChat} from 'services/chat';

type ChatPageProps = {
  router: CoreRouter;
  // eslint-disable-next-line no-undef
  store: Store<AppState>;
  onProfileClick?: () => void;
  onCreateClick?: () => void;
  onCreateChat?: () => void;
};

export class ChatPage extends Block<ChatPageProps> {
  static componentName = 'ChatPage';

  constructor(props: ChatPageProps) {
    super(props);

    this.setProps({
      onProfileClick: () => {
        this.props.router.go('/profile');
      },
      onCreateClick: () => {
        this.toggleCreateClickBtn();
      },
      onCreateChat: () => {
        this.createChat();
      },
    });

  }

  toggleCreateClickBtn() {
    const createInput = document.querySelector('.chat-list__create-title') as HTMLElement;
    createInput.classList.toggle('is-active');
  }

  createChat() {
    const input = document.querySelector('input[name="chatName"]') as HTMLInputElement;
    if (input.value) {
      const chatTitle = {
        title: input.value,
      };
      this.props.store.dispatch(createChat, JSON.stringify(chatTitle));
      this.toggleCreateClickBtn();
    }
  }

  render() {
    // language=hbs
    return `
        <section class="chat-block">
          <div class="chat-list">
            <div class="chat-list__header">
                <div class="chat-list__profile">
                    {{{Button
                            text="Создать чат"
                            type="button"
                            className="chat-list__create-chat"
                            onClick=onCreateClick
                    }}}
                    {{{Button
                            text="Профиль"
                            type="button"
                            mod="profile"
                            onClick=onProfileClick
                            isArrow=true
                    }}}
                </div>
                <div class="chat-list__create-title">
                {{{InputWrapper
                        type="text"
                        type="text"
                        placeholder="Введите имя чата"
                        inputName="chatName"
                        id="chatName"
                        value=""
                }}}
                {{{Button
                        text=''
                        type="button"
                        className="chat__send-btn"
                        onClick=onCreateChat
                }}}
                </div>
                {{{SearchInput}}}
            </div>

          {{{ChatList}}}
          </div>
          {{{Chat}}}
    </section>
    `;
  }
}

export default withRouter(withStore(ChatPage));

