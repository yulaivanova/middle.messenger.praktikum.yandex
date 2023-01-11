import {renderDOM, registerComponent} from 'core';
import {ProfilePage} from './profile-page';

import '../../styles/style.css';

import ProfileList from 'components/profile-list';
import ProfileControls from 'components/profile-controls';
import Button from 'components/button';
import Input from 'components/input';
import InputError from 'components/input-error';
import InputWrapper from 'components/input-wrapper';
import Profile from 'components/profile';

registerComponent(Button);
registerComponent(InputError);
registerComponent(Input);
registerComponent(InputWrapper);
registerComponent(Profile);
registerComponent(ProfileList);
registerComponent(ProfileControls);

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new ProfilePage());
});
