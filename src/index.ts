import {renderDOM, registerComponent, Store} from 'core';
import {CoreRouter} from 'core/Router/CoreRouter';
import {PathRouter} from 'core/Router/PathRouter';
import {initRouter} from './router';
import {defaultState} from './store';
import LoginPage from './pages/login';
import {initApp} from './services/initApp';

import * as components from './components';

import './styles/style.css';

Object.values(components).forEach((Component: any) => {
  registerComponent(Component);
});

declare global {
  interface Window {
    store: Store<AppState>;
    router: CoreRouter;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const store = new Store<AppState>(defaultState);
  const router = new PathRouter();

  /**
   * Помещаем роутер и стор в глобальную область для доступа в хоках with*
   * @warning Не использовать такой способ на реальный проектах
   */
  window.router = router;
  window.store = store;


  renderDOM(new LoginPage({}));

  store.on('changed', (prevState, nextState) => {
    // if (process.env.DEBUG) {
    // eslint-disable-next-line no-console
    console.log(
        '%cstore updated',
        'background: #222; color: #bada55',
        nextState,
    );
    // }
  });

  /**
   * Инициализируем роутер
   */
  initRouter(router, store);

  /**
   * Загружаем данные для приложения
   */
  store.dispatch(initApp);
});
