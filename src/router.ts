import {Store, renderDOM} from 'core';
import {CoreRouter} from 'core/Router/CoreRouter';
import {getScreenComponent, Screens} from './utils';

const routes = [
  {
    path: '*',
    block: Screens.Login,
    shouldAuthorized: false,
  },
  {
    path: '/signin',
    block: Screens.Signin,
    shouldAuthorized: false,
  },
  {
    path: '/chat',
    block: Screens.Chat,
    shouldAuthorized: true,
  },
  {
    path: '/profile',
    block: Screens.Profile,
    shouldAuthorized: true,
  }
];

export function initRouter(router: CoreRouter, store: Store<AppState>) {
  routes.forEach((route) => {
    router.use(route.path, () => {
      store.dispatch({screen: route.block});
      const isAuthorized = Boolean(store.getState().user);
      const currentScreen = Boolean(store.getState().screen);

      if (isAuthorized && store.getState().screen === 'login') {
        store.dispatch({screen: Screens.Chat});
        return;
      }

      if (isAuthorized || !route.shouldAuthorized) {
        store.dispatch({screen: route.block});
        return;
      }

      if (!isAuthorized && route.shouldAuthorized) {
        store.dispatch({screen: Screens.Login});
        return;
      }

      if (!currentScreen) {
        store.dispatch({screen: Screens.Login});
      }
    });
  });

  /**
   * Глобальный слушатель изменений в сторе
   * для переключения активного экрана
   */
  store.on('changed', (prevState, nextState) => {
    if (!prevState.appIsInited && nextState.appIsInited) {
      router.start();
    }

    if (prevState.screen !== nextState.screen) {
      const Page = getScreenComponent(nextState.screen);
      renderDOM(new Page({}));
      document.title = `App / ${Page.componentName}`;
    }
  });
}
