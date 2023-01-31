import {BlockClass} from 'core';

type WithAvatarProps = { avatarPath: string | null };

export function withAvatar<P extends WithAvatarProps>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({...props, avatarPath: window.store.getState().avatarPath});
    }

    __onChangeAvatarCallback = (prevState: AppState, nextState: AppState) => {
      if (JSON.stringify(prevState.avatarPath) !== JSON.stringify(nextState.avatarPath)) {
        // @ts-expect-error this is not typed
        this.setProps({...this.props, avatarPath: nextState.avatarPath});
      }
    }

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on('changed', this.__onChangeAvatarCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off('changed', this.__onChangeAvatarCallback);
    }

  } as BlockClass<Omit<P, 'avatarPath'>>;
}
