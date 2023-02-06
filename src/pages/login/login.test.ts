import {getByTestId, prettyDOM} from '@testing-library/dom';
import LoginPage from './login';
import {renderBlock, step} from 'tests/renderUtils';

const USER_MOCK = {
  avatar: '/d66cf98f-05dc-49ba-8d2b-c1db0c5888c3/761d694b-39b5-4dee-ab15-78a2bf05461d_12.png',
  displayName: 'Джон дое',
  email: 'johndoe2@johndoe2.johndoe2',
  firstName: 'Джон',
  id: 3094,
  login: 'johndoe2',
  phone: '89137909090',
  secondName: 'Дое',
};

describe('pages/ProfilePage', () => {
  it('should go to signup page when click on signin btn', async () => {
    await step('render login page to dom', () => {
      renderBlock({
        Block: LoginPage,
        props: {},
        state: {
          screen: 'login',
          appIsInited: true,
        },
      });
    });

    await step('click to signin button', () => {
      const button = getByTestId(document.body, 'signin-btn');
      button.click();
    });

    await step('check if signin page is open', async () => {
      expect(getByTestId(document.body, 'signin')).toBeInTheDocument();
    });
  });
});
