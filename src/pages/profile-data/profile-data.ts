import {Block} from 'core';

export class ProfileDataPage extends Block {
  constructor() {
    super();
  }

  render() {

    // language=hbs
    return `
        {{{Profile
                name="Иван"
                showName=true
                noChange=false
                profileControls=true
        }}}
    `;
  }
}
