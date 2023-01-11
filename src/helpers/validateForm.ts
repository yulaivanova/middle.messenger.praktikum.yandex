// eslint-disable-next-line no-shadow
export enum ValidateRuleType {
  Login = 'login',
  Password = 'password',
  Email = 'email',
  Phone = 'phone',
  Name = 'name'
}

type ValidateRule = {
  value: string;
  type: ValidateRuleType;
}

export function validateForm(rules: ValidateRule[]): string {
  let errorMessage = '';

  for (let i = 0; i < rules.length; i++) {
    const {type, value} = rules[i];

    if (value.length === 0) {
      errorMessage = 'Поле обязательно для заполнения';
      break;
    }

    if (type === ValidateRuleType.Login) {
      const getLoginRegEx = () => /^\w*[a-zA-Z]+[-_]*\w*$/;
      if (!new RegExp(getLoginRegEx(), '').test(value)) {
        errorMessage = 'Логин должен быть на латинице, может содержать цифры, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)';
        break;
      }
    }

    if (type === ValidateRuleType.Password) {
      if (value.length < 8) {
        errorMessage = 'Пароль должен содержать как минимум 8 символа';
        break;
      } else if (value.length > 40) {
        errorMessage = 'Пароль должен содержать меньше 40 символов';
        break;
      } else {
        const getLoginRegEx = () => /^(?=.*[А-ЯA-Z])(?=.*\d)[a-zA-Zа-яА-Я\d]+$/;
        if (!new RegExp(getLoginRegEx(), '').test(value)) {
          errorMessage = 'Пароль должен содержать хотя бы одну заглавную букву и цифру';
          break;
        }
      }
    }

    if (type === ValidateRuleType.Email) {
      const getMailRegEx = () => /[a-zA-Zа-яёА-ЯЁ0-9]{1}([a-zA-Zа-яёА-ЯЁ0-9\-_\.]{1,})?@[a-zA-Zа-яёА-ЯЁ0-9\-]{1}([a-zA-Zа-яёА-ЯЁ0-9.\-]{1,})?[a-zA-Zа-яёА-ЯЁ0-9\-]{1}\.[a-zA-Zа-яёА-ЯЁ]{2,6}/;
      if (!new RegExp(getMailRegEx(), '').test(value)) {
        errorMessage = 'Введите корректный email';
        break;
      }
    }

    if (type === ValidateRuleType.Phone) {
      if (value.length < 10) {
        errorMessage = 'Телефон должен содержать больше 10 символов';
        break;
      } else if (value.length > 15) {
        errorMessage = 'Телефон должен содержать меньше 15 символов';
        break;
      } else {
        const getPhoneRegEx = () => /^[0-9\+]{1}[0-9]{9,15}$/;
        if (!new RegExp(getPhoneRegEx(), '').test(value)) {
          errorMessage = 'Телефон может начинаться с +, должен содержать только цифры';
          break;
        }
      }
    }

    if (type === ValidateRuleType.Name) {
      const getNameRegEx = () => /^[А-ЯA-Z][a-zA-Zа-яА-Я-]+$/;
      if (!new RegExp(getNameRegEx(), '').test(value)) {
        errorMessage = 'Первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)';
        break;
      }
    }
  }

  return errorMessage;
}
