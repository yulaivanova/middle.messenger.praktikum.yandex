import {getByTestId} from '@testing-library/dom';
import {ProfileList} from './profile-list';
import {renderBlock} from 'tests/renderUtils';
describe('pages/ProfilePage', () => {

  it('should render profile-list', () => {
    renderBlock({
      Block: ProfileList,
      props: {},
    });

    expect(getByTestId(document.body, 'profile-list')).toBeInTheDocument();
  });
});
