import Block from 'core/Block';

// @ts-ignore
const url = new URL('../../assets/img/user-icon.png', import.meta.url).href;

export class ChatList extends Block {
  static componentName = 'ChatList';

  constructor() {
    super();

    this.setProps({

    });
  }
  protected render(): string {
    // language=hbs
    return `
       <div class="chat-list">
          <div class="chat-list__header">
              <a href="#" class="chat-list__profile">
                  Профиль
                  <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 9L5 5L1 1" stroke="#999999"/>
                  </svg>
              </a>
              {{{SearchInput}}}
          </div>
          <div class="chat-list__content">
              <ul class="chat-list__list">
                  <li class="chat-list__item">
                    {{{ChatItem imgPath="${url}"
                                text="Круто"
                                user=true
                                time="10:49"
                                name="Андрей"
                                badge="3"}}}
                  </li>
                  <li class="chat-list__item">
                      {{{ChatItem imgPath="${url}"
                                  text="Круто"
                                  user=true
                                  time="10:49"
                                  name="Андрей" }}}
                  </li>
                  <li class="chat-list__item">
                      {{{ChatItem imgPath="${url}"
                                  text="Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей!"
                                  user=true
                                  time="10:49"
                                  name="Вадим"
                                  badge="22"}}}
                  </li>
                  <li class="chat-list__item">
                      {{{ChatItem imgPath="${url}"
                                  text="Круто" user=true time="10:49"
                                  name="Андрей"
                      }}}
                  </li>
                  <li class="chat-list__item">
                      {{{ChatItem imgPath="${url}"
                                  text="В 2008 году художник Jon Rafma начал собирать. В 2008 году художник Jon Rafman начал собирать."
                                  user=false
                                  time="10:49"
                                  name="Андрей"
                      }}}
                  </li>
                  <li class="chat-list__item">
                      {{{ChatItem imgPath="${url}"
                                  text="Круто"
                                  user=true
                                  time="10:49"
                                  name="Андрей"
                                  badge="3"}}}
                  </li>
                  <li class="chat-list__item">
                      {{{ChatItem imgPath="${url}"
                                  text="Круто"
                                  user=true
                                  time="10:49"
                                  name="Андрей" }}}
                  </li>
                  <li class="chat-list__item">
                      {{{ChatItem imgPath="${url}"
                                  text="Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей!"
                                  user=true
                                  time="10:49"
                                  name="Вадим"
                                  badge="22"}}}
                  </li>
                  <li class="chat-list__item">
                      {{{ChatItem imgPath="${url}"
                                  text="Круто" user=true time="10:49"
                                  name="Андрей"
                      }}}
                  </li>
                  <li class="chat-list__item">
                      {{{ChatItem imgPath="${url}"
                                  text="В 2008 году художник Jon Rafman  начал собирать. В 2008 году художник Jon Rafman  начал собирать."
                                  user=false
                                  time="10:49"
                                  name="Андрей"
                      }}}
                  </li>
                  <li class="chat-list__item">
                      {{{ChatItem imgPath="${url}"
                                  text="Круто"
                                  user=true
                                  time="1 мая 2020"
                                  name="Андрей"
                      }}}
                  </li>
              </ul>
          </div>
      </div>
    `;
  }
}
