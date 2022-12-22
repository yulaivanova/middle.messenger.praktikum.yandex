import {Block} from 'core';

export class ProfilePage extends Block {
  constructor() {
    super();
  }

  render() {

    // language=hbs
    return `
        {{{Profile
                name="Иван"
                showName=true
                noChange=true
                profileControls=true
        }}}
    `;
  }
}
