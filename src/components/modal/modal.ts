import Block from 'core/Block';
import {validateForm, ValidateRuleType} from "../../helpers/validateForm";

interface ModalProps {
  modalTitle: string;
  modalFile?: boolean;
  modalLogin?:boolean;
}

export class Modal extends Block {
  static componentName = 'Modal';
  constructor({...props}: ModalProps) {
    super({...props});

    this.setProps({
      loginHandler: (e: Event) => {
        const inputEl = e.target as HTMLInputElement;
        const error = validateForm([{type: ValidateRuleType.Login, value: inputEl.value}]);
        this.refs.loginInputRef.refs.errorRef.setProps({text: error});
      },
      onLoginSubmit: (e: Event) => {
        e.preventDefault();
        const btnEl = e.target as HTMLInputElement;
        const form = btnEl.closest('form') as HTMLFormElement;
        const input = form.querySelector('input');
        const formData = new FormData(form);
        // eslint-disable-next-line no-console
        console.log(formData, ...formData);
        if (input) {
          const error = validateForm([{type: ValidateRuleType.Login, value: input.value}]);
          this.refs.loginInputRef.refs.errorRef.setProps({text: error});
        }
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="modal is-active">
            <div class="modal__wrapper">
                <div class="modal__overlay"></div>
                <div class="modal__content">
                    <button class="modal__close-btn" type="button" aria-label="Закрыть попап">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.0001 13L1.00317 1" stroke="black" stroke-linecap="round"/>
                            <path d="M1.00047 13L12.9974 1" stroke="black" stroke-linecap="round"/>
                        </svg>
                    </button>
                    <div class="modal__inner">
                        <form action="#">
                          <p class="modal__title">{{modalTitle}}</p>
                          {{#if modalFile}}
                              <div class="input-file">
                                  <label>
                                      <span class="input-file__label-text">Выбрать файл на компьютере</span>
                                      <input class="visually-hidden" type="file" id="avatar" name="avatar" accept="image/png, image/jpeg, image/heic" >
                                  </label>
                                  <p class="input-file__error">Нужно выбрать файл</p>
                              </div>
                              {{{Button
                                      text="Поменять"
                                      type="button"
                              }}}
                          {{/if}}
                          {{#if modalLogin}}
                              {{{InputWrapper
                                      type="text"
                                      type="text"
                                      placeholder="Логин"
                                      inputName="login"
                                      id="login"
                                      value=""
                                      onInput=loginHandler
                                      onFocus=loginHandler
                                      onBlur=loginHandler
                                      ref="loginInputRef"
                              }}}
                              {{{Button
                                      text="Добавить"
                                      type="button"
                                      onClick=onLoginSubmit
                              }}}
                          {{/if}}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `
  }
}
