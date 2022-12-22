import {renderDOM, registerComponent} from 'core';
import {LoginPage} from '../login/login';

import '../../styles/style.css';

import Button from 'components/button';
import Input from 'components/input';
import InputError from 'components/input-error';
import InputWrapper from 'components/input-wrapper';

registerComponent(Button);
registerComponent(InputError);
registerComponent(Input);
registerComponent(InputWrapper);

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new LoginPage());
});
