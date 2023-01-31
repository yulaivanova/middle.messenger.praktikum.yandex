import {BlockClass} from 'core';
import {Message} from '../api/types';

type WithMessagesProps = { activeMessages: Message[] | null | Message};

export function withMessages<P extends WithMessagesProps>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({...props, activeMessages: window.store.getState().activeMessages});
    }

    __onChangeMessagesCallback = (prevState: AppState, nextState: AppState) => {
      if (JSON.stringify(prevState.activeMessages) !== JSON.stringify(nextState.activeMessages)) {

        // @ts-expect-error this is not typed
        this.setProps({...this.props, activeMessages: nextState.activeMessages});
      }
    }

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on('changed', this.__onChangeMessagesCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off('changed', this.__onChangeMessagesCallback);
    }

  } as BlockClass<Omit<P, 'activeMessages'>>;
}
