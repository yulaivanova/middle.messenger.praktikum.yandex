import Block from '../../core/Block';

// import './input.css';

interface ErrorProps {
  text?: string;
  className?: string;
}

export class InputError extends Block<ErrorProps> {
  static componentName = 'InputError';
  protected render(): string {
    // language=hbs
    return `
        <span class="input-error{{#if className}} {{className}}{{/if}}">{{text}}</span>
    `;
  }
}
