import {Block} from 'core';

export class ProfileAvatarPage extends Block {
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
                modalFile=true
                modalTitle="Загрузить файл"
        }}}
    `;
  }
}
