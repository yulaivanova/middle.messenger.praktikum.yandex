import {renderDOM, registerComponent} from 'core';
import {ProfileAvatarPage} from './profile-load-avatar';

import '../../styles/style.css';

import ProfileList from 'components/profile-list';
import ProfileControls from 'components/profile-controls';
import Button from 'components/button';
import Input from 'components/input';
import InputError from 'components/input-error';
import InputWrapper from 'components/input-wrapper';
import Profile from 'components/profile';
import Modal from 'components/modal';

registerComponent(Button);
registerComponent(InputError);
registerComponent(Input);
registerComponent(InputWrapper);
registerComponent(Profile);
registerComponent(ProfileList);
registerComponent(ProfileControls);
registerComponent(Modal);

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new ProfileAvatarPage());
});
