export class UserInfo {
    constructor({ nameSelector, infoSelector }) {
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);

        this._nameInput = document.querySelector('.popup__style_type_name');
        this._infoInput = document.querySelector('.popup__style_type_about');
    }

    //вернуть объект с данными пользователя
    getUserInfo() {
        const userInfo = {};

        this._nameInput.value = this._name.textContent;
        this._infoInput.value = this._info.textContent;

        userInfo.name = this._nameInput.value;
        userInfo.info = this._infoInput.value;

        return userInfo;
    }
    setUserInfo(userInfo) {
        this._name.textContent = userInfo.name;
        this._info.textContent = userInfo.info;
    }
}