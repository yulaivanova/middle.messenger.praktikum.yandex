import Block from 'core/Block';

// import './input.css';

interface InputWrapperProps {
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?:() => void;
  type?: 'text' | 'password' | 'email';
  inputName?: string;
  id?: string;
  placeholder?: string;
  value?: string;
  error?:string;
}

export class InputWrapper extends Block {
  static componentName = 'InputWrapper';
  constructor({...props}: InputWrapperProps) {
    super({
      ...props,
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="input-wrapper">
            {{{Input type="{{type}}"
                     placeholder="{{placeholder}}"
                     inputName="{{inputName}}"
                     id="{{id}}"
                     onFocus=onFocus
                     onInput=onInput
                     onBlur=onBlur
            }}}
            <label for="{{id}}" class="input-wrapper__label">{{placeholder}}</label>
            {{{InputError ref="errorRef" text=error}}}
        </div>
    `;
  }
}
