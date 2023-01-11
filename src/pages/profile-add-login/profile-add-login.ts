import {Block} from 'core';

export class ProfileLoginPage extends Block {
  constructor() {
    super();
  }

  render() {

    // language=hbs
    return `
        {{{Profile
                name="Иван"
                showName=false
                noChange=false
                profileControls=false
                saveBtn=true
                modal=true
                modalFile=false
                modalLogin=true
                modalTitle="Добавить пользователя"
        }}}
    `;
  }
}
