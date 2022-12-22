import Block from '../../core/Block';

// import './input.css';

interface ErrorProps {
  text?: string;
}

export class InputError extends Block<ErrorProps> {
  static componentName = 'InputError';
  protected render(): string {
    // language=hbs
    return `
        <span class="input-error">{{text}}</span>
    `
  }
}
