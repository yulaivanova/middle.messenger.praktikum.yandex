import Block from 'core/Block';
import {withStore, withMessages} from '../../utils';
import {Store} from '../../core';
import {addUser} from '../../services/chat';
import MessagesController from 'services/messages';
import {Message} from 'api/types';

const testImg = new URL('../../assets/img/test-image.png', import.meta.url).href;
const profileImg = new URL('../../assets/img/user-icon.png', import.meta.url).href;

interface ChatProps {
  store: Store<AppState>;
  imgPath: string;
  name: string;
  activeMessages: Message[] | null | Message;
  error?:string;
  onLoginAdd?: () => void;
  isModal?:()=> boolean;
  modalTitle?: string;
  onRemoveUserBtnClick?: () => void;
  isLoginModal?: () => boolean;
  userId?: number;
}
class Chat extends Block<ChatProps> {
  static componentName = 'Chat';

  constructor({...props}: ChatProps) {
    super({...props});

    this.setProps({
      isLoginModal: () => this.props.store.getState().isLoginModal,
      onAddUserBtnClick: () => {
        this.props.store.dispatch({isLoginModal: true});
      },
      onRemoveUserBtnClick: () => {
        this.props.store.dispatch({isLoginModal: true});
      },
      onModalCloseClick: () => {
        this.closeModal();
      },
      onModalOverlayClick: (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.closest('.modal__overlay')) {
          this.closeModal();
        }
      },
      messageHandler: (e: FocusEvent) => {
        const inputEl = e.target as HTMLInputElement;
        const error = inputEl.value.length === 0 ? 'Сообщение не должно быть пустым' : '';
        this.refs.errorRef.setProps({text: error});
      },
      onBlur: () => {
        const error = '';
        this.refs.errorRef.setProps({text: error});
      },
      onSubmit: (e: Event) => {
        e.preventDefault();
        const btnEl = e.target as HTMLInputElement;
        const form = btnEl.closest('form') as HTMLFormElement;
        const input = form.querySelector('input') as HTMLInputElement;
        const error = input.value.length === 0 ? 'Сообщение не должно быть пустым' : '';
        this.refs.errorRef.setProps({text: error});
        if (!error) {
          const chatId = this.props.store.getState().activeChat;
          MessagesController.sendMessage(chatId, input.value);
        }
      },
      onChatControlsClick: () => {
        if (this.props.store.getState().activeChat) {
          const controlsBlock = document.querySelector('.chat__controls-block') as HTMLElement;
          controlsBlock.classList.toggle('is-active');
        }
      },
      onLoginAdd: () => {
        this.addUser();
      },
    });

    this.getUserId();
  }

  getUserId() {
    this.setProps({userId: this.props.store.getState().user?.id});
  }

  addUser() {
    const loginInput = document.querySelector('input[name="login"]') as HTMLInputElement;
    if (loginInput.value) {
      const loginData = {
        users: [Number(loginInput.value)],
        chatId: this.props.store.getState().activeChat,
      };

      this.props.store.dispatch(addUser, JSON.stringify(loginData));
    }
  }

  closeModal() {
    this.props.store.dispatch({isLoginModal: false});
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="chat">
            <div class="chat__header">
                <div class="chat__img">
                    <img src="${profileImg}" alt="user-photo">
                </div>
                <p class="chat__title">{{name}}</p>
                {{{Button
                        chatControls=true
                        onClick=onChatControlsClick
                }}}
                <div class="chat__controls-block">
                    {{{Button
                            type="button"
                            text="Добавить пользователя"
                            className="chat__control"
                            onClick=onAddUserBtnClick
                    }}}
                    {{{Button
                            type="button"
                            text="Удалить пользователя"
                            className="chat__control"
                            onClick=onRemoveUserBtnClick
                    }}}
                </div>
            </div>
            <div class="chat__content">
                <div class="chat__scrollable-content">
                    {{#each activeMessages}}
                        {{{ChatBubble message=this userId=../userId}}}
                    {{/each}}
                </div>
            </div>
            <form class="chat__footer" action="#">
                <div class="chat__message">
                    <label for="message">
                        {{{Input type="text"
                                 placeholder="Сообщение"
                                 inputName="message"
                                 id="message"
                                 onBlur=onBlur
                                 onInput=messageHandler
                                 onFocus=messageHandler
                        }}}
                    </label>
                    {{{InputError ref="errorRef" text=error}}}
                </div>
                {{{Button
                        text=''
                        type="button"
                        className="chat__send-btn"
                        onClick=onSubmit
                }}}
            </form>
            {{#if isLoginModal}}
                {{{Modal
                        modalFile=false
                        modalLogin=true
                        modalTitle='Добавить пользователя'
                        onModalCloseClick=onModalCloseClick
                        onModalOverlayClick=onModalOverlayClick
                        onLoginAdd=onLoginAdd
                }}}
            {{/if}}
        </div>
    `;
  }
}
const ComposedChat = withStore(withMessages(Chat));

export {ComposedChat as Chat};

