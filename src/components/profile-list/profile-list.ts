import Block from '../../core/Block';
import {validateForm, ValidateRuleType} from '../../helpers/validateForm';
import {withUser, withStore, withRouter} from 'utils';
import {CoreRouter, Store} from 'core';


interface ProfileProps {
  store: Store<AppState>;
  user: User | null;
  name?: string;
  password?:boolean;
  noChange?:boolean;
  showName?:boolean;
  error?:string;
  onAvatarClick?: () => void;
  loginHandler?:(e: Event)=> void;
  emailHandler?:(e: Event)=> void;
  phoneHandler?:(e: Event)=> void;
  nameHandler?:(e: Event)=> void;
  passwordHandler?:(e: Event)=> void;
  passwordRepeatHandler?:(e: Event)=> void;
  avatarPath?: () => string | null;
}

class ProfileList extends Block<ProfileProps> {
  static componentName = 'ProfileList';
  constructor(props: ProfileProps) {
    super(props);

    this.setProps({
      avatarPath: () => this.props.store.getState().avatarPath,
      loginHandler: (e: Event) => {
        const inputEl = e.target as HTMLInputElement;
        const error = validateForm([{type: ValidateRuleType.Login, value: inputEl.value}]);
        this.refs.errorLoginRef.setProps({text: error});
      },
      emailHandler: (e: Event) => {
        const inputEl = e.target as HTMLInputElement;
        const error = validateForm([{type: ValidateRuleType.Email, value: inputEl.value}]);
        this.refs.errorEmailRef.setProps({text: error});
      },
      phoneHandler: (e: Event) => {
        const inputEl = e.target as HTMLInputElement;
        const error = validateForm([{type: ValidateRuleType.Phone, value: inputEl.value}]);
        this.refs.errorPhoneRef.setProps({text: error});
      },
      nameHandler: (e: Event) => {
        const inputEl = e.target as HTMLInputElement;
        const error = validateForm([{type: ValidateRuleType.Name, value: inputEl.value}]);
        if (inputEl.name === 'first_name') {
          this.refs.errorNameRef.setProps({text: error});
        }
        if (inputEl.name === 'second_name') {
          this.refs.errorSurnameRef.setProps({text: error});
        }
        if (inputEl.name === 'display_name') {
          this.refs.errorDisplayNamelRef.setProps({text: error});
        }
      },
      passwordHandler: (e: Event) => {
        const inputEl = e.target as HTMLInputElement;
        const error = validateForm([{type: ValidateRuleType.Password, value: inputEl.value}]);
        this.refs.errorPasswordRef.setProps({text: error});
      },
      passwordRepeatHandler: (e: Event) => {
        const inputEl = e.target as HTMLInputElement;
        this.checkPassword(inputEl);
      },
    });
  }

  checkPassword(inputEl: HTMLInputElement) {
    const passwordInput = this.refs.passwordInputRef.getContent() as HTMLInputElement;
    const errorText = passwordInput.value === inputEl.value ? '' : 'Пароли не совпадают';
    this.refs.errorRepeatPasswordRef.setProps({text: errorText});
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="profile-list" data-testid="profile-list">
            {{{Button
                    text=""
                    type="button"
                    className="profile-list__img"
                    isProfileImg=true
                    imageURL=avatarPath
                    onClick=onAvatarClick
            }}}
            {{#if showName}}
                <p class="profile-list__title">{{name}}</p>
            {{/if}}
            <ul class="profile-list__list">
                {{#if password}}
                    <li class="profile-list__item" data-testid="change-password">
                        <p class="profile-list__subtitle">Старый пароль</p>
                        {{{Input type="password"
                                 placeholder="Введите пароль"
                                 inputName="oldPassword"
                                 id="oldPassword"
                                 value=""
                        }}}
                    </li>
                    <li class="profile-list__item">
                        <p class="profile-list__subtitle">Новый пароль</p>
                        {{{Input type="password"
                                 placeholder="Введите новый пароль"
                                 inputName="newPassword"
                                 id="newPassword"
                                 value=""
                                 onFocus=passwordHandler
                                 onInput=passwordHandler
                                 onBlur=passwordHandler
                                 ref="passwordInputRef"
                        }}}
                        {{{InputError ref="errorPasswordRef" text=''}}}
                    </li>
                    <li class="profile-list__item">
                        <p class="profile-list__subtitle">Повторите новый пароль</p>
                        {{{Input type="password"
                                 placeholder="Повторите новый пароль"
                                 inputName="newPassword_repeat"
                                 id="newPassword_repeat"
                                 onFocus=passwordRepeatHandler
                                 onInput=passwordRepeatHandler
                                 onBlur=passwordRepeatHandler
                                 value=""
                        }}}
                        {{{InputError ref="errorRepeatPasswordRef" text=''}}}
                    </li>
                {{else}}
                    <li class="profile-list__item {{#if noChange}}no-pointer{{/if}}">
                        <p class="profile-list__subtitle">Почта</p>
                        {{{Input type="email"
                                 placeholder="Введите email"
                                 inputName="email"
                                 id="email"
                                 value=user.email
                                 ref="emailInputRef"
                                 onFocus=emailHandler
                                 onInput=emailHandler
                                 onBlur=emailHandler
                        }}}
                        {{{InputError ref="errorEmailRef" text=''}}}
                    </li>
                    <li class="profile-list__item {{#if noChange}}no-pointer{{/if}}">
                        <p class="profile-list__subtitle">Логин</p>
                        {{{Input type="text"
                                 placeholder="Введите логин"
                                 inputName="login"
                                 id="login"
                                 value=user.login
                                 ref="loginInputRef"
                                 onFocus=loginHandler
                                 onInput=loginHandler
                                 onInput=loginHandler
                        }}}
                        {{{InputError ref="errorLoginRef" text=''}}}
                    </li>
                    <li class="profile-list__item {{#if noChange}}no-pointer{{/if}}">
                        <p class="profile-list__subtitle">Имя</p>
                        {{{Input type="text"
                                 placeholder="Введите имя"
                                 inputName="first_name"
                                 id="first_name"
                                 value=user.firstName
                                 ref="nameInputRef"
                                 onInput=nameHandler
                                 onBlur=nameHandler
                                 onFocus=nameHandler
                        }}}
                        {{{InputError ref="errorNameRef" text=''}}}
                    </li>
                    <li class="profile-list__item {{#if noChange}}no-pointer{{/if}}">
                        <p class="profile-list__subtitle">Фамилия</p>
                        {{{Input type="text"
                                 placeholder="Введите фамилию"
                                 inputName="second_name"
                                 id="second_name"
                                 value=user.secondName
                                 ref="surnameInputRef"
                                 onInput=nameHandler
                                 onBlur=nameHandler
                                 onFocus=nameHandler
                        }}}
                        {{{InputError ref="errorSurnameRef" text=''}}}
                    </li>
                    <li class="profile-list__item {{#if noChange}}no-pointer{{/if}}">
                        <p class="profile-list__subtitle">Имя в чате</p>
                        {{{Input type="text"
                                 placeholder="Введите имя в чате"
                                 inputName="display_name"
                                 id="display_name"
                                 value=user.displayName
                                 ref="displayNameInputRef"
                                 onInput=nameHandler
                                 onBlur=nameHandler
                                 onFocus=nameHandler
                        }}}
                        {{{InputError ref="errorDisplayNamelRef" text=''}}}
                    </li>
                    <li class="profile-list__item {{#if noChange}}no-pointer{{/if}}">
                        <p class="profile-list__subtitle">Телефон</p>
                        {{{Input type="tel"
                                 placeholder="Введите телефон"
                                 inputName="phone"
                                 id="phone"
                                 value=user.phone
                                 ref="phoneInputRef"
                                 onInput=phoneHandler
                                 onBlur=phoneHandler
                                 onFocus=phoneHandler
                        }}}
                        {{{InputError ref="errorPhoneRef" text=''}}}
                    </li>
                {{/if}}
            </ul>
        </div>
    `;
  }
}

const ComposedProfile = withStore(withUser(ProfileList));

export {ComposedProfile as ProfileList};
