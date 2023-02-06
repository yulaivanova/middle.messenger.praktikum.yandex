import Block from '../../core/Block';
import {ValidateRuleType} from '../../helpers/validateForm';

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

  protected render(): string {
    // language=hbs
    return `
        <ul class="profile-controls" data-testid="profile-controls">
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
                            dataTestId="password-btn"
                    }}}
                </li>
                <li class="profile-controls__item profile-controls__item--red" >
                    {{{Button
                            text='Выйти'
                            type="button"
                            mod="no-border"
                            onClick=onLogout
                            dataTestId="logout-btn"
                    }}}
                </li>
            {{/if}}
        </ul>
    `;
  }
}

const ComposedControls = ProfileControls;

export {ComposedControls as ProfileControls};
