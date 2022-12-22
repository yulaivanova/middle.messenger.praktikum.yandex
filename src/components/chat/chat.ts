import Block from 'core/Block';

// @ts-ignore
const testImg = new URL('../../assets/img/test-image.png', import.meta.url).href;
// @ts-ignore
const profileImg = new URL('../../assets/img/user-icon.png', import.meta.url).href;

interface ChatProps {
  imgPath: string;
  name: string;
  error?:string;
}
export class Chat extends Block {
  static componentName = 'Chat';
  constructor({...props}: ChatProps) {
    super({
      ...props,
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
        const formData = new FormData(form);
        // eslint-disable-next-line no-console
        console.log(formData, ...formData);
      },
    });
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
                <button type="button" class="chat__controls">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <div class="chat__content">
                <div class="chat__scrollable-content">
                    <div class="chat__date">19 июля</div>
                    <div class="chat__bubble">
                        Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.<span class="chat__time">
                        <span class="chat__time-inner">11:56</span>
                    </span>
                    </div>
                    <div class="chat__bubble chat__bubble--image">
                        <img src="${testImg}" alt="test">
                        <span class="chat__time">
                    <span class="chat__time-inner">11:56</span>
                </span>
                    </div>
                    <div class="chat__bubble chat__bubble--sended">Круто!
                        <span class="chat__time">
                        <svg width="11" height="5" viewBox="0 0 11 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="-0.5" x2="3.765" y2="-0.5" transform="matrix(0.705933 0.708278 -0.705933 0.708278 0.700195 2.33313)" stroke="$color-royal-blue"/>
                            <line y1="-0.5" x2="5.6475" y2="-0.5" transform="matrix(0.705933 -0.708278 0.705933 0.708278 3.35828 5.00006)" stroke="$color-royal-blue"/>
                            <line y1="-0.5" x2="5.6475" y2="-0.5" transform="matrix(0.705933 -0.708278 0.705933 0.708278 6.01587 5.00006)" stroke="$color-royal-blue"/>
                        </svg>11:55
                        </span>
                    </div>
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
                        type="submit"
                        className="chat__send-btn"
                        onClick=onSubmit
                }}}
            </form>
        </div>
    `;
  }
}
