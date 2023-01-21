import {Block, CoreRouter, Store} from 'core';
import {withUser, withRouter, withStore, withIsModal} from '../../utils';
import {logout} from '../../services/auth';
import {changeUserProfile, changeUserPassword, changeUserAvatar} from '../../services/profile';

type ProfilePageProps = {
  user: User | null;
  router: CoreRouter;
  store: Store<AppState>;
  isModal: boolean;
  onChangeClick?: () => void;
  onChangePasswordClick?: () => void;
  onSaveDataClick?: () => void;
  onSavePasswordClick?: () => void;
  profileControls: boolean;
  noChange: boolean;
  savePasswordBtn: boolean;
  saveDataBtn: boolean;
  showName: boolean;
  onBackClick?: () => void;
  onAvatarClick?: () => void;
  onModalCloseClick?:() => void;
  onModalOverlayClick?:(e:Event) => void;
  modalFile: boolean;
  modalTitle: string;
  password: boolean;
  onUserLogout?:() => void;
  formError?: () => string | null;
  isSettings: () => boolean;
  onAvatarChange?:(e: Event) => void;
  onProfileBack?:() => void;
};

export class ProfilePage extends Block<ProfilePageProps> {
  constructor(props: ProfilePageProps) {
    super(props);

    this.setProps({
      isSettings: () => this.props.store.getState().isSettings,
      formError: () => this.props.store.getState().loginFormError,
      onUserLogout: () => this.props.store.dispatch(logout),
      savePasswordBtn: false,
      saveDataBtn: false,
      profileControls: true,
      noChange: true,
      showName: true,
      modalFile: false,
      modalTitle: '',
      password: false,
      onChangeClick: () => {
        this.props.store.dispatch({isSettings: false});
        this.props.profileControls = false;
        this.props.noChange = false;
        this.props.saveDataBtn = true;
        this.props.showName = false;
        this.props.savePasswordBtn = false;
        this.props.password = false;
      },
      onSaveDataClick: () => {
        this.onSaveDataBtnClick();
      },
      onSavePasswordClick: () => {
        this.onSavePasswordBtnClick();
      },
      onBackClick: () => {
        this.props.router.go('/chat');
      },
      onAvatarClick: () => {
        this.props.store.dispatch({isModal: true});
        this.props.modalFile = true;
        this.props.modalTitle = 'Загрузить файл';
      },
      onChangePasswordClick: () => {
        this.props.store.dispatch({isSettings: false});
        this.props.profileControls = false;
        this.props.noChange = true;
        this.props.password = true;
        this.props.savePasswordBtn = true;
        this.props.saveDataBtn = false;
        this.props.showName = false;
      },
      onModalCloseClick: () => {
        this.closeModal();
      },
      onModalOverlayClick: (e:Event) => {
        const target = e.target as HTMLElement;
        if (target.closest('.modal__overlay')) {
          this.closeModal();
        }
      },
      onAvatarChange: (e: Event) => {
        const target = e.target as HTMLElement;
        this.onAvatarChangeClick(target);
      },
      onProfileBack: () => {
        this.props.store.dispatch({isSettings: true});
        this.props.savePasswordBtn = false;
        this.props.saveDataBtn = false;
      },
    });
  }

  onAvatarChangeClick(btn:HTMLElement) {
    const formData = new FormData();
    const fileInput = document.getElementById('avatar');

    if (fileInput.value) {
      formData.append('avatar', fileInput.files[0]);
      this.props.store.dispatch(changeUserAvatar, formData);
    }
  }
  closeModal() {
    this.props.modalFile = false;
    this.props.modalTitle = '';
    this.props.store.dispatch({isModal: false});
  }
  openProfileList() {
    this.props.profileControls = true;
    this.props.noChange = true;
    this.props.savePasswordBtn = false;
    this.props.saveDataBtn = false;
    this.props.showName = true;
    this.props.password = false;
  }

  onSavePasswordBtnClick() {
    const profileError = document.querySelector('.profile-error') as HTMLElement;
    const profileList = document.querySelector('.profile-list') as HTMLElement;
    const inputErrors = profileList.querySelectorAll('.input-error');
    const inputs = profileList.querySelectorAll('input');
    let isValid = false;
    isValid = [...inputErrors].every((item) => item.textContent === '');
    if (isValid) {
      isValid = [...inputs].every((item) => item.value !== '');
    }

    if (isValid) {
      const userData = {
        oldPassword: (profileList.querySelector('input[name="oldPassword"]') as HTMLInputElement).value,
        newPassword: (profileList.querySelector('input[name="newPassword"]') as HTMLInputElement).value,
      };
      this.props.store.dispatch(changeUserPassword, JSON.stringify(userData));
    } else {
      profileError.textContent = 'Заполните все поля';
    }
  }

  onSaveDataBtnClick() {
    const profileError = document.querySelector('.profile-error') as HTMLElement;
    const profileList = document.querySelector('.profile-list') as HTMLElement;
    const inputErrors = profileList.querySelectorAll('.input-error');
    const inputs = profileList.querySelectorAll('input');
    let isValid = false;
    isValid = [...inputErrors].every((item) => item.textContent === '');
    if (isValid) {
      isValid = [...inputs].every((item) => item.value !== '');
    }

    if (isValid) {
      const userData = {
        first_name: (profileList.querySelector('input[name="first_name"]') as HTMLInputElement).value,
        second_name: (profileList.querySelector('input[name="second_name"]') as HTMLInputElement).value,
        login: (profileList.querySelector('input[name="login"]') as HTMLInputElement).value,
        email: (profileList.querySelector('input[name="email"]') as HTMLInputElement).value,
        display_name: (profileList.querySelector('input[name="display_name"]') as HTMLInputElement).value,
        phone: (profileList.querySelector('input[name="phone"]') as HTMLInputElement).value,
      };

      this.props.store.dispatch(changeUserProfile, JSON.stringify(userData));
    } else {
      profileError.textContent = 'Заполните все поля';
    }
  }

  render() {
    // language=hbs
    return `
        <section class="profile">
            {{{Button
                    text=""
                    type="button"
                    className="profile__back-btn"
                    isProfileBack=true
                    onClick=onBackClick
            }}}
            <div class="profile__content">
                <div class="profile__wrapper">
                    <form action="#">
        {{#if isSettings}}
            {{{ProfileList
                    onAvatarClick=onAvatarClick
                    noChange=noChange
                    name=user.firstName
                    showName=true
                    password=false
            }}}
            {{{ProfileControls
                    onChangeClick=onChangeClick
                    profileControls=true
                    onChangePasswordClick=onChangePasswordClick
                    onLogout=onUserLogout
            }}}
        {{else}}
                        {{{ProfileList
                                onAvatarClick=onAvatarClick
                                noChange=noChange
                                name=user.firstName
                                showName=showName
                                password=password
                        }}}
                        {{{ProfileControls
                                onChangeClick=onChangeClick
                                profileControls=profileControls
                                onChangePasswordClick=onChangePasswordClick
                                onLogout=onUserLogout
                        }}}
                        {{#if savePasswordBtn}}
                            {{{InputError text=formError className="profile-error"}}}
                            {{{Button
                                    text='Сохранить'
                                    type="button"
                                    className="profile-controls__save-btn"
                                    onClick=onSavePasswordClick
                            }}}
                            {{{Button
                                    text='Вернуться в профиль'
                                    type="button"
                                    className="profile-controls__back"
                                    onClick=onProfileBack
                            }}}
                        {{/if}}
                        {{#if saveDataBtn}}
                            {{{InputError text=formError className="profile-error"}}}
                            {{{Button
                                    text='Сохранить'
                                    type="button"
                                    className="profile-controls__save-btn"
                                    onClick=onSaveDataClick
                            }}}
                            {{{Button
                                    text='Вернуться в профиль'
                                    type="button"
                                    className="profile-controls__back"
                                    onClick=onProfileBack
                            }}}
                        {{/if}}
        {{/if}}
                    </form>
                </div>
            </div>
            {{#if isModal}}
                {{{Modal
                        modalFile=modalFile
                        modalLogin=modalLogin
                        modalTitle="{{modalTitle}}"
                        onModalCloseClick=onModalCloseClick
                        onModalOverlayClick=onModalOverlayClick
                        onAvatarChange=onAvatarChange
                }}}
            {{/if}}
        </section>
    `;
  }
}

export default withRouter(withStore(withUser(withIsModal(ProfilePage))));
