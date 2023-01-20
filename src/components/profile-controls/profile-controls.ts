import Block from '../../core/Block';
import {validateForm, ValidateRuleType} from '../../helpers/validateForm';
import {withRouter, withStore} from '../../utils';
import {CoreRouter, Store} from '../../core';
import {logout} from '../../services/auth';

type InputRules = {
  [propertyName: string]: ValidateRuleType,
}

const rules: InputRules = {
  'email': ValidateRuleType.Email,
  'login': ValidateRuleType.Login,
  'first_name': ValidateRuleType.Name,
  'second_name': ValidateRuleType.Name,
  'display_name': ValidateRuleType.Name,
  'phone': ValidateRuleType.Phone,
  'password': ValidateRuleType.Password,
};
interface ProfileControlsProps {
  profileControls?: boolean;
  saveBtn?: boolean;
  onChangeClick?: () => void;
  onChangePasswordClick?: () => void;
  onLogout?: () => void;
}

class ProfileControls extends Block<ProfileControlsProps> {
  static componentName = 'ProfileControls';
  constructor(props: ProfileControlsProps) {
    super(props);
  }

  // onSubmit(e: Event) {
  //   e.preventDefault();
  //   const btnEl = e.target as HTMLInputElement;
  //   const form = btnEl.closest('form') as HTMLFormElement;
  //   const inputs = form.querySelectorAll('input');
  //   const formData = new FormData(form);
  //   // eslint-disable-next-line no-console
  //   console.log(formData, ...formData);
  //   inputs.forEach((input: HTMLInputElement) => {
  //     const parent = input.closest('.profile-list__item ') as HTMLElement;
  //     const errorWrap = parent.querySelector('.input-error') as HTMLElement;
  //     let error;
  //
  //     if (input.name === 'newPassword_repeat') {
  //       const passwordInput = form.querySelector('input[name="newPassword"]') as HTMLInputElement;
  //       error = passwordInput.value === input.value ? '' : 'Пароли не совпадают';
  //     } else {
  //       error = validateForm([{type: rules[input.name], value: input.value}]);
  //     }
  //
  //     if (errorWrap) {
  //       errorWrap.textContent = error;
  //     }
  //   });
  // }

  protected render(): string {
    // language=hbs
    return `
        <ul class="profile-controls">
            {{#if profileControls}}
                <li class="profile-controls__item">
                    {{{Button
                            text='Изменить данные'
                            type="button"
                            mod="no-border"
                            onClick=onChangeClick
                    }}}
                </li>
                <li class="profile-controls__item">
                    {{{Button
                            text='Изменить пароль'
                            type="button"
                            mod="no-border"
                            onClick=onChangePasswordClick
                    }}}
                </li>
                <li class="profile-controls__item profile-controls__item--red">
                    {{{Button
                            text='Выйти'
                            type="button"
                            mod="no-border"
                            onClick=onLogout
                    }}}
                </li>
            {{/if}}
        </ul>
    `;
  }
}

const ComposedControls = ProfileControls;

export {ComposedControls as ProfileControls};
