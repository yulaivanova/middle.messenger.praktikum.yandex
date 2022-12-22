import {renderDOM, registerComponent} from 'core';
import {ErrorPage} from 'components/error-page/error-page';

import '../../styles/style.css';

import Button from 'components/button';

registerComponent(Button);

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new ErrorPage({code: '500', text: 'Мы уже фиксим'}));
});
