import Block from 'core/Block';

interface ButtonProps {
  text: string;
  type?: 'button' | 'submit';
  mod: string;
  className?: string;
  isArrow?: boolean;
  onClick: () => void;
  isProfileBack?: boolean;
  isProfileImg?: boolean;
  imageURL?: string;
  closeBtn?:boolean;
  chatControls?:boolean;
}

export class Button extends Block {
  static componentName = 'Button';
  constructor({text, mod, type, className, isArrow, isProfileBack, isProfileImg, imageURL, closeBtn, chatControls, onClick}: ButtonProps) {
    super({text, mod, type, className, isArrow, isProfileBack, isProfileImg, imageURL, closeBtn, chatControls, events: {click: onClick}});
  }

  protected render(): string {
    // console.log(this.props.imageURL, this.props.className, 'button');
    return `
        {{#if chatControls}}
            <button type="button" class="chat__controls" aria-label="Открыть контролы чата">
                    <span></span>
                    <span></span>
                    <span></span>
            </button>
        {{else if closeBtn}}
            <button class="modal__close-btn" type="button" aria-label="Закрыть попап">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.0001 13L1.00317 1" stroke="black" stroke-linecap="round"/>
                    <path d="M1.00047 13L12.9974 1" stroke="black" stroke-linecap="round"/>
                </svg>
            </button>
        {{else if isProfileImg}}
        <button class="{{className}}">
            <img src="{{imageURL}}" alt="profile">
            <span>Поменять аватар</span>
         </button>
        {{else}}
        <button type="{{type}}" class="button {{#if mod}}button--{{mod}}{{/if}} {{#if className}}{{className}}{{/if}}">
          {{#if isProfileBack}}
            <span>
              <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="5.19995" width="11" height="1.6" fill="white"/>
                  <path d="M7 1L11 6L7 11" stroke="white" stroke-width="1.6"/>
              </svg>
            </span>
          {{else}}
          {{text}}
          {{#if isArrow}}
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 9L5 5L1 1" stroke="#999999"/>
                    </svg>
          {{/if}}
          {{/if}}
        </button>
        {{/if}}
    `;
  }
}
