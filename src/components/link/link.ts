import Block from 'core/Block';

interface LinkProps {
  text: string;
  to: string;
  onClick?: () => void;
}

export class Link extends Block {
  static componentName = 'Link';

  constructor(props: LinkProps) {
    super({...props, events: {click: props.onClick} });
  }

  render() {
    // language=hbs
    return `
        <a href="{{to}}">{{text}}</a>
    `;
  }
}
