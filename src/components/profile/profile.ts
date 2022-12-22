import {Block} from 'core';

interface ProfileProps {
  name?: string;
  showName?:boolean;
  noChange?:boolean;
  profileControls?:boolean;
  saveBtn?:boolean;
  password?: boolean;
  modal?:boolean;
  modalFile?:boolean;
  modalTitle?:string;
  modalLogin?:boolean;
}

export class Profile extends Block {
  static componentName = 'Profile';
  constructor({...props}: ProfileProps) {
    super({...props});

    this.setProps({

    });
  }

  render() {
    // language=hbs
    return `
        <section class="profile">
            <button type="button" aria-label="Назад" class="profile__back-btn">
            <span>
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="5.19995" width="11" height="1.6" fill="white"/>
                <path d="M7 1L11 6L7 11" stroke="white" stroke-width="1.6"/>
            </svg>
            </span>
            </button>
            <div class="profile__content">
                <div class="profile__wrapper">
                    <form action="#">
                      {{{ProfileList noChange=noChange  name="{{name}}" showName=showName password=password imageUrl='../../assets/img/profile.png'}}}
                      {{{ProfileControls profileControls=profileControls saveBtn=saveBtn}}}
                    </form>
                </div>
            </div>
            {{#if modal}}
                {{{Modal modalFile=modalFile modalLogin=modalLogin modalTitle="{{modalTitle}}"}}}
            {{/if}}
        </section>
    `;
  }
}
