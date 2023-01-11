import Block from 'core/Block';

interface ButtonProps {
  text: string;
  type?: 'button' | 'submit';
  mod: string;
  className: string;
  onClick: () => void;
}

export class Button extends Block {
  static componentName = 'Button';
  constructor({text, mod, type, className, onClick}: ButtonProps) {
    super({text, mod, type, className, events: {click: onClick}});
  }

  protected render(): string {
    return `
        <button type="{{type}}" class="button {{#if mod}}button--{{mod}}{{/if}} {{#if className}}{{className}}{{/if}}">{{text}}</button>
    `;
  }
}
