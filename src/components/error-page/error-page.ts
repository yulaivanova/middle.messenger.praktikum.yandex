import {Block} from 'core';

interface ErrorProps {
  code?: string;
  text?: string;

}

export class ErrorPage extends Block {

  static componentName = 'ErrorPage';
  constructor({...props}: ErrorProps) {
    super({...props});

    this.setProps({

    });
  }

  render() {
    // language=hbs
    return `
        <section class="error">
            <div class="error__wrapper">
                <p class="error__code">{{code}}</p>
                <p class="error__text">{{text}}</p>
                {{{Button
                        text="Назад к чатам"
                        type="button"
                        mod="no-border"
                }}}
            </div>
        </section>
    `;
  }
}
