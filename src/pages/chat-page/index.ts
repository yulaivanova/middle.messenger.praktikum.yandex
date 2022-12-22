import {renderDOM, registerComponent} from 'core';
import {ChatPage} from '../chat-page/chat-page';

import '../../styles/style.css';

import ChatList from 'components/chat-list';
import SearchInput from 'components/search-input';
import ChatItem from 'components//chat-item';
import Chat from 'components/chat';
import Button from 'components/button';
import Input from 'components/input';
import InputError from 'components/input-error';

registerComponent(ChatList);
registerComponent(SearchInput);
registerComponent(ChatItem);
registerComponent(Chat);
registerComponent(Button);
registerComponent(InputError);
registerComponent(Input);


document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new ChatPage());
});
