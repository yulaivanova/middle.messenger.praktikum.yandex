import {Block, CoreRouter, Store} from 'core';
import {validateForm, ValidateRuleType} from 'helpers/validateForm';
import {withRouter, withStore} from 'utils';
import {login} from '../../services/auth';

type InputRules = {
  [propertyName: string]: ValidateRuleType,
}

const rules: InputRules = {
  'login': ValidateRuleType.Login,
  'password': ValidateRuleType.Password,
};

type LoginPageProps = {
  router: CoreRouter;
  store: Store<AppState>;
  loginHandler?: (e: Event) => void;
  passwordHandler?: (e: Event) => void;
  onSubmit?: (e: Event) => void;
  onRegister?: () => void;
  formError?: () => string | null;
  onLogin?: () => void;
};

export class LoginPage extends Block<LoginPageProps> {
  static componentName = 'LoginPage';
  constructor(props: LoginPageProps) {
    super(props);

    this.setProps({
      formError: () => this.props.store.getState().loginFormError,
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
      onRegister: () => this.onRegister(),
      onLogin: () => this.onLogin(),
    });
  }

  protected getStateFromProps() {
    this.state = {
      values: {
        login: '',
        password: '',
      },
    };
  }

  onLogin() {
    const loginData = {
      login: (this.refs.loginInputRef.getContent().querySelector('input') as HTMLInputElement).value,
      password: (this.refs.passwordInputRef.getContent().querySelector('input') as HTMLInputElement).value,
    };
    const nextState = {
      values: {...loginData},
    };

    this.setState(nextState);

    const loginEl = this.refs.loginInputRef.getContent().querySelector('input') as HTMLInputElement;
    const passwordEl = this.refs.passwordInputRef.getContent().querySelector('input') as HTMLInputElement;

    const loginError = validateForm([{type: rules[loginEl.name], value: loginEl.value}]);
    const passwordError = validateForm([{type: rules[passwordEl.name], value: passwordEl.value}]);

    this.refs.loginInputRef.refs.errorRef.setProps({text: loginError});
    this.refs.passwordInputRef.refs.errorRef.setProps({text: passwordError});

    if (passwordError === '' && loginError === '') {
      this.props.store.dispatch(login, JSON.stringify(loginData));
    }
  }
  onRegister() {
    this.props.router.go('/signin');
  }
  render() {
    const {values} = this.state;

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
                                value="${values.login}"
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
                                value="${values.password}"
                                onInput=passwordHandler
                                onFocus=passwordHandler
                                onBlur=passwordHandler
                                ref="passwordInputRef"
                        }}}
                    </div>
                    <div class="login__buttons">
                        {{{Button
                                text="Авторизироваться"
                                type="button"
                                onClick=onLogin
                        }}}
                        {{{Button
                                text="Нет аккаунта"
                                type="button"
                                mod="no-border"
                                onClick=onRegister
                                dataTestId="signin-btn"
                        }}}
                    </div>
                    {{{InputError text=formError}}}
                </form>
            </div>
        </section>
    `;
  }
}

export default withRouter(withStore(LoginPage));
