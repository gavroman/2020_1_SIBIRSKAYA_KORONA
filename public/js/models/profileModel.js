'use strict';

import ApiService from '../libs/apiService.js';

export default class JoinModel {
    constructor(eventBus, router) {
        this.api = new ApiService();
        this.eventBus = eventBus;
        this.router = router;

        this.eventBus.subscribe('getData', this.getUser.bind(this));

        /* this.eventBus.subscribe('inputSurname', this.validateSurname.bind(this));
         this.eventBus.subscribe('inputName', this.validateName.bind(this));
         this.eventBus.subscribe('inputOldPassword', this.validatePassword.bind(this));
         this.eventBus.subscribe('inputPassword', this.validatePassword.bind(this));
         this.eventBus.subscribe('inputPasswordRepeat', this.validatePasswordRepeat.bind(this));
         this.eventBus.subscribe('inputEmail', this.validateEmail.bind(this));*/

        this.putUser = this.putUser.bind(this);
        this.eventBus.subscribe('submitAbout', this.putUser);
        this.eventBus.subscribe('submitPasswords', this.putUser);
        this.eventBus.subscribe('submitEmail', this.putUser);
        this.eventBus.subscribe('submitImg', this.putUser);

        this.eventBus.subscribe('userInput', this.validate.bind(this));
    }

    /*
        validatePasswordRepeat(data) {
            console.log(data);
            const error = (data[0] !== data[1]);
            this.eventBus.call('inputPasswordRepeatError', error);
        }

        validatePassword(data) {
            const error = (data === '');
            this.eventBus.call('inputOldPasswordError', error);
        }

        validateName(data) {
            const error = (data === '');
            this.eventBus.call('inputNameError', error);
        }

        validateSurname(data) {
            const error = (data === '');
            this.eventBus.call('inputSurnameError', error);
        }

        validateEmail(data) {
            const error = (data === '');
            this.eventBus.call('inputEmailError', error);
        }*/


    validate(dataType, data) {
        let valid = true;
        switch (dataType) {
            case 'inputName':
                valid = (data !== '');
                break;
            case 'inputSurname':
                valid = (data !== '');
                break;
            case 'inputPassword':
                valid = (data !== '');
                break;
            case 'inputEmail':
                valid = (data !== '1');
                break;
            default:
                return true;
        }
        this.eventBus.call('userInputError', !valid, dataType);
        return valid;
    }

    validateAll(data) {
        for (const [key, value] of Object.entries(data)) {
            if (!this.validate(key + '', value)) {
                return false;
            }
        }
    }

    putUser(data) {
        if (!this.validateAll(data)) {
            console.log('INVALID');
            return;
        }
        const formData = new FormData();
        formData.append('newNickname', data.inputNickname);
        formData.append('newName', data.inputName || '');
        formData.append('newSurname', data.inputSurname || '');
        formData.append('newEmail', data.inputEmail || '');
        formData.append('oldPassword', data.inputOldPassword || '');
        formData.append('newPassword', data.inputPassword || '');

        if (data.avatar !== void 0) {
            formData.append('avatar', data.avatar);
            formData.append('avatarExtension', data.avatar.name.split('.').pop());
        }

        this.api.putUser(formData).then((response) => {
            // console.log(response.status);
            switch (response.status) {
                case 200: // - OK (успешный запрос)
                    this.getUser();
                    break;
                case 401: // - Unauthorized (не авторизован)
                    this.router.go('/');
                    break;
                case 403: // - Forbidden (нет прав)
                    this.eventBus.call('');
                    break;
                case 404: // - NotFound (нет пользвателя с указанным ником)
                    break;
                default:
                    console.log('Бекендер молодец!!!');
            }
        });
    }

    getUser() {
        this.api.getUser({}).then((response) => {
            console.log('profile get user' + response.status);
            switch (response.status) {
                case 200: // - OK (успешный запрос)
                    const data = response.body.user;
                    // data.avatar = (data.avatar === 'avatars/kek.jpg') ? '/img/default_avatar.png' : data.avatar;
                    this.eventBus.call('gotData', data);
                    break;
                case 303: // - SeeOther (не авторизован, случай без query string)
                    this.router.go('/login');
                    break;
                case 400: // - BadRequest (неверный запрос)
                    break;
                case 404: // - NotFound (нет пользвателя с указанным ником)
                    break;
                default:
                    console.log('Бекендер молодец!!!');
            }
        });
    }
}
