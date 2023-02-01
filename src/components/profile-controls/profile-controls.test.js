import {getByTestId} from '@testing-library/dom';
import {ProfileControls} from './profile-controls';
import {renderBlock} from 'tests/renderUtils';
describe('pages/ProfilePage', () => {

  it('should render profile-controls', () => {
    renderBlock({
      Block: ProfileControls,
      props: {profileControls: true},
    });

    expect(getByTestId(document.body, 'profile-controls')).toBeInTheDocument();
  });
});
