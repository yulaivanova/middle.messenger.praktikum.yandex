import {BlockClass} from 'core';

type WithIsModal = {
  isModal: boolean;
}

/**
 * HOC не подписан на изменения стора, поэтому будет корректно работать
 * только при обернутом withStore хоке.
 */
export function withIsModal<P extends WithIsModal>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({...props, isModal: () => window.store.getState().isModal});
    }
  } as BlockClass<Omit<P, 'isModal'>>;
}
