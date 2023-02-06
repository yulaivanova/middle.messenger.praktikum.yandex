import Block from 'core/Block';
import {withChats, withRouter, withStore} from '../../utils';
import {CoreRouter, Store} from '../../core';
import {Chats} from '../../api/types';

const url = '../../assets/img/user-icon.png';

type ChatListProps = {
  router: CoreRouter;
  store: Store<AppState>;
  chats: Chats | null;
  onProfileClick?: () => void;
  onChatClick?: () => void;
};

class ChatList extends Block<ChatListProps> {
  static componentName = 'ChatList';

  constructor(props: ChatListProps) {
    super(props);

    this.setProps({
      onProfileClick: () => {
        this.props.router.go('/profile');
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="chat-list__content">
              <ul class="chat-list__list">
                  {{#each chats}}
                      <li class="chat-list__item">
                          {{{ChatItem imgPath="${url}"
                                      text=this.last_message
                                      user=true
                                      name=this.title
                                      badge=this.unread_count
                                      id=this.id
                          }}}
                      </li>
                  {{/each}}
              </ul>
        </div>
    `;
  }
}

const ComposedChatList = withRouter(withStore(withChats((ChatList))));

export {ComposedChatList as ChatList};

