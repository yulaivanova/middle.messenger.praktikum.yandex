import {Block} from 'core';
import {validateForm, ValidateRuleType} from 'helpers/validateForm';

type InputRules = {
  [propertyName: string]: ValidateRuleType,
}

const rules: InputRules = {
  'login': ValidateRuleType.Login,
  'password': ValidateRuleType.Password,
};
export class LoginPage extends Block {
  constructor() {
    super();

    this.setProps({
      loginHandler: (e: Event) => {
        const inputEl = e.target as HTMLInputElement;
        const error = validateForm([{type: ValidateRuleType.Login, value: inputEl.value}]);
        this.refs.loginInputRef.refs.errorRef.setProps({text: error});
      },
      passwordHandler: (e: Event) => {
        const inputEl = e.target as HTMLInputElement;
        const error = validateForm([{type: ValidateRuleType.Password, value: inputEl.value}]);
        this.refs.passwordInputRef.refs.errorRef.setProps({text: error});
      },
      onSubmit: (e: Event) => this.onSubmit(e),
    });
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

      if (input.name === 'login') {
        this.refs.loginInputRef.refs.errorRef.setProps({text: error});
      }

      if (input.name === 'password') {
        this.refs.passwordInputRef.refs.errorRef.setProps({text: error});
      }
    })
  }
  render() {
    // language=hbs
    return `
        <section class="login">
            <div class="login__form">
                <form action="#">
                    <h1 class="login__title">Вход</h1>
                    <div class="login__inputs">
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
                        {{{InputWrapper
                                type="password"
                                placeholder="Пароль"
                                inputName="password"
                                id="password"
                                value=""
                                onInput=passwordHandler
                                onFocus=passwordHandler
                                onBlur=passwordHandler
                                ref="passwordInputRef"
                        }}}
                    </div>
                    <div class="login__buttons">
                        {{{Button
                                text="Авторизироваться"
                                type="submit"
                                onClick=onSubmit
                        }}}
                        {{{Button
                                text="Нет аккаунта"
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
