import { getByTestId, prettyDOM } from '@testing-library/dom';
import ProfilePage from './profile-page';
import {renderBlock, step} from 'tests/renderUtils';

const USER_MOCK = {
  avatar: "/d66cf98f-05dc-49ba-8d2b-c1db0c5888c3/761d694b-39b5-4dee-ab15-78a2bf05461d_12.png",
  displayName: "Джон дое",
  email: "johndoe2@johndoe2.johndoe2",
  firstName: "Джон",
  id: 3094,
  login: "johndoe2",
  phone: "89137909090",
  secondName: "Дое",
};
describe('pages/ProfilePage', () => {
  it('should render profile-list with changing password', async () => {
    await step('render profile page to dom', () => {
      renderBlock({
        Block: ProfilePage,
        props: {},
        state: {
          screen: 'profile',
          appIsInited: true,
          user: USER_MOCK
        },
      });
    });

    await step('click to change password button', () => {
      const button = getByTestId(document.body, 'password-btn');
      button.click();
    });

    await step('check if password input render', async () => {
      expect(getByTestId(document.body, 'change-password')).toBeInTheDocument();
    });
  });
});
