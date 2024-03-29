import Block from '../../core/Block';

// import './input.css';

interface InputProps {
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClick?: () => void;
  type?: 'text' | 'password' | 'email';
  inputName?: string;
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?:() => void;
  isFile?: boolean;
  onKeydown?:() => void;
}

export class Input extends Block {
  static componentName = 'Input';
  constructor({onInput, onFocus, onBlur, onClick, onChange, onKeydown, ...props}: InputProps) {
    super({...props, events: {input: onInput, focus: onFocus, blur: onBlur, click: onClick, change: onChange, keypress: onKeydown}});
  }

  protected render(): string {
    // language=hbs
    return `
        <input
                type="{{type}}"
                name="{{inputName}}"
                placeholder="{{placeholder}}"
                id="{{id}}"
                value="{{value}}"
                required
        {{#if isFile}} accept="image/png, image/jpeg, image/heic" class="visually-hidden"{{/if}}">
    `;
  }
}
