import {Block} from 'core';
import {validateForm, ValidateRuleType} from 'helpers/validateForm';

type InputRules = {
  [propertyName: string]: ValidateRuleType,
}

const rules: InputRules = {
  'email': ValidateRuleType.Email,
  'login': ValidateRuleType.Login,
  'first_name': ValidateRuleType.Name,
  'second_name': ValidateRuleType.Name,
  'phone': ValidateRuleType.Phone,
  'password': ValidateRuleType.Password,
};

export class SigninPage extends Block {
  constructor() {
    super();

    this.setProps({
      loginHandler: (e: Event) => {
        const inputEl = e.target as HTMLInputElement;
        const error = validateForm([{type: ValidateRuleType.Login, value: inputEl.value}]);
        this.refs.loginInputRef.refs.errorRef.setProps({text: error});
      },
      nameHandler: (e: Event) => {
        const inputEl = e.target as HTMLInputElement;
        const error = validateForm([{type: ValidateRuleType.Name, value: inputEl.value}]);
        if (inputEl.name === 'first_name') {
          this.refs.nameInputRef.refs.errorRef.setProps({text: error});
        }
        if (inputEl.name === 'second_name') {
          this.refs.surnameInputRef.refs.errorRef.setProps({text: error});
        }
      },
      emailHandler: (e: Event) => {
        const inputEl = e.target as HTMLInputElement;
        const error = validateForm([{type: ValidateRuleType.Email, value: inputEl.value}]);
        this.refs.emailRef.refs.errorRef.setProps({text: error});
      },
      phoneHandler: (e: Event) => {
        const inputEl = e.target as HTMLInputElement;
        const error = validateForm([{type: ValidateRuleType.Phone, value: inputEl.value}]);
        this.refs.phoneInputRef.refs.errorRef.setProps({text: error});
      },
      passwordHandler: (e: Event) => {
        const inputEl = e.target as HTMLInputElement;
        const error = validateForm([{type: ValidateRuleType.Password, value: inputEl.value}]);
        this.refs.passwordInputRef.refs.errorRef.setProps({text: error});
      },
      passwordRepeatHandler: (e: Event) => {
        const inputEl = e.target as HTMLInputElement;
        this.checkPassword(inputEl);
      },
      onSubmit: (e: Event) => this.onSubmit(e),
    });
  }

  checkPassword(inputEl: HTMLInputElement) {
    const passwordInput = this.refs.passwordInputRef.getContent().querySelector('input') as HTMLInputElement;
    const errorText = passwordInput.value === inputEl.value ? '' : 'Пароли не совпадают';
    this.refs.repeatPasswordRef.refs.errorRef.setProps({text: errorText});
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const btnEl = e.target as HTMLInputElement;
    const form = btnEl.closest('form') as HTMLFormElement;
    const inputs = form.querySelectorAll('input');
    const formData = new FormData(form);
    // eslint-disable-next-line no-console
    console.log(formData, ...formData);
    inputs.forEach((input: HTMLInputElement) => {
      const error = validateForm([{type: rules[input.name], value: input.value}]);
      if (input.name === 'email') {
        this.refs.emailRef.refs.errorRef.setProps({text: error});
      }
      if (input.name === 'login') {
        this.refs.loginInputRef.refs.errorRef.setProps({text: error});
      }
      if (input.name === 'first_name') {
        this.refs.nameInputRef.refs.errorRef.setProps({text: error});
      }
      if (input.name === 'second_name') {
        this.refs.surnameInputRef.refs.errorRef.setProps({text: error});
      }
      if (input.name === 'phone') {
        this.refs.phoneInputRef.refs.errorRef.setProps({text: error});
      }
      if (input.name === 'password') {
        this.refs.passwordInputRef.refs.errorRef.setProps({text: error});
      }
      if (input.name === 'password_repeat') {
        this.checkPassword(input);
      }
    });
  }
  render() {
    // language=hbs
    return `
        <section class="login">
            <div class="login__form">
                <form action="#">
                    <h1 class="login__title">Регистрация</h1>
                    <div class="login__inputs">
                        {{{InputWrapper
                                type="email"
                                placeholder="Почта"
                                inputName="email"
                                id="email"
                                value=""
                                onInput=emailHandler
                                onBlur=emailHandler
                                onFocus=emailHandler
                                ref="emailRef"
                        }}}
                        {{{InputWrapper
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
                        {{{InputWrapper
                                type="text"
                                placeholder="Имя"
                                inputName="first_name"
                                id="first_name"
                                value=""
                                onInput=nameHandler
                                onBlur=nameHandler
                                onFocus=nameHandler
                                ref="nameInputRef"
                        }}}
                        {{{InputWrapper
                                type="text"
                                placeholder="Фамилия"
                                inputName="second_name"
                                id="second_name"
                                value=""
                                onInput=nameHandler
                                onBlur=nameHandler
                                onFocus=nameHandler
                                ref="surnameInputRef"
                        }}}
                        {{{InputWrapper
                                type="tel"
                                placeholder="Телефон"
                                inputName="phone"
                                id="phone"
                                value=""
                                onInput=phoneHandler
                                onBlur=phoneHandler
                                onFocus=phoneHandler
                                ref="phoneInputRef"
                        }}}
                        {{{InputWrapper
                                type="password"
                                placeholder="Пароль"
                                inputName="password"
                                id="password"
                                value=""
                                onInput=passwordHandler
                                onBlur=passwordHandler
                                onFocus=passwordHandler
                                ref="passwordInputRef"
                        }}}
                        {{{InputWrapper
                                type="password"
                                placeholder="Пароль (ещё раз)"
                                inputName="password_repeat"
                                id="password_repeat"
                                value=""
                                onInput=passwordRepeatHandler
                                onBlur=passwordRepeatHandler
                                onFocus=passwordRepeatHandler
                                ref="repeatPasswordRef"
                        }}}
                    </div>
                    <div class="login__buttons">
                        {{{Button
                                text="Зарегистрироваться"
                                type="submit"
                                onClick=onSubmit
                        }}}
                        {{{Button
                                text="Войти"
                                type="button"
                                mod="no-border"
                        }}}
                    </div>
                </form>
            </div>
        </section>
    `;
  }
}
