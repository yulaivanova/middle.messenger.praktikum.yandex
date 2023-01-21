import Block from 'core/Block';
import {validateForm, ValidateRuleType} from '../../helpers/validateForm';
import {withIsModal, withStore} from '../../utils';
import {Store} from '../../core';

interface ModalProps {
  store: Store<AppState>;
  modalTitle: string;
  modalFile?: boolean;
  modalLogin?:boolean;
  onModalCloseClick?: () => void;
  onModalOverlayClick?:(e:Event) => void;
  onAvatarChange?: (e: Event) => void;
  onAvatarInputChange?:(e: Event) => void;
  formError?: () => string | null;
  onLoginAdd?: () => void;
}

class Modal extends Block {
  static componentName = 'Modal';
  constructor({...props}: ModalProps) {
    super({...props, events: {click: props.onModalOverlayClick}});

    this.setProps({
      formError: () => this.props.store.getState().fileFormError,
      onAvatarInputChange:(e: Event) => {
        const label = document.querySelector('.input-file__label-text') as HTMLFormElement;
        const curFile = e.target.files[0];
        label.textContent = curFile.name;
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
                    {{{Button
                            text="Поменять"
                            type="button"
                            closeBtn=true
                            onClick=onModalCloseClick
                    }}}
                    <div class="modal__inner">
                        <form action="#">
                          <p class="modal__title">{{modalTitle}}</p>
                          {{#if modalFile}}
                              <div class="input-file">
                                  <label>
                                      <span class="input-file__label-text">Выбрать файл на компьютере</span>
                                      {{{Input type="file"
                                               inputName="avatar"
                                               id="avatar"
                                               onChange=onAvatarInputChange
                                               isFile=true
                                      }}}
                                  </label>
                                  <p class="input-file__error">Нужно выбрать файл</p>
                              </div>
                              {{{Button
                                      text="Поменять"
                                      type="button"
                                      onClick=onAvatarChange
                              }}}
                              {{{InputError text=formError className="file-error"}}}
                          {{/if}}
                          {{#if modalLogin}}
                              {{{InputWrapper
                                      type="text"
                                      type="text"
                                      placeholder="ID полльзователя"
                                      inputName="login"
                                      id="login"
                                      value=""
                                      ref="loginInputRef"
                              }}}
                              {{{Button
                                      text="Добавить"
                                      type="button"
                                      onClick=onLoginAdd
                              }}}
                              {{{InputError text=formError className="file-error"}}}
                          {{/if}}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
  }
}

const ComposedModal = withStore(Modal);

export {ComposedModal as Modal};
