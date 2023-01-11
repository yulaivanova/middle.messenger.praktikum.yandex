import Block from './Block';
import Handlebars, {HelperOptions} from 'handlebars';

interface BlockConstructable<Props = any> {
  new(props: Props): Block;
  componentName: string;
}

export default function registerComponent<Props>(Component: BlockConstructable<Props>) {
  Handlebars.registerHelper(Component.componentName || Component.name, function (this: Props, {hash: {ref, ...hash}, data, fn}: HelperOptions) {
    if (!data.root.children) {
      data.root.children = {};
    }

    if (!data.root.refs) {
      data.root.refs = {};
    }

    const {children, refs} = data.root;

    /**
     * Костыль для того, чтобы передавать переменные
     * внутрь блоков вручную подменяя значение
     */
    (Object.keys(hash) as any).forEach((key: keyof Props) => {
      // eslint-disable-next-line no-invalid-this
      if (this[key] && typeof this[key] === 'string') {
        hash[key] = hash[key].replace(new RegExp(`{{${key}}}`, 'i'), this[key]);
      }
    });

    const component = new Component(hash);

    children[component.id] = component;

    if (ref) {
      refs[ref] = component;
    }

    // eslint-disable-next-line no-invalid-this
    const contents = fn ? fn(this) : '';

    return `<div data-id="${component.id}">${contents}</div>`;
  });
}
