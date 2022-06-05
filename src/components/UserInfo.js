export class UserInfo {
    constructor({ nameSelector, infoSelector }) {
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
    }
    getUserInfo() {
        const userInfo = {};
        userInfo.name = this._name.textContent;
        userInfo.about = this._info.textContent;
        return userInfo;
    }
    setUserInfo(userInfo) {
        this._name.textContent = userInfo.name;
        this._info.textContent = userInfo.about;
    }
}