import {Block} from 'core';

export class ProfilePasswordPage extends Block {
  constructor() {
    super();
  }

  render() {
    // language=hbs
    return `
        {{{Profile
                name="Иван"
                showName=false
                noChange=true
                profileControls=false
                password=true
                saveBtn=true
        }}}
    `;
  }
}
