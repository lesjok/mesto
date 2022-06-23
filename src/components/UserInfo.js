export class UserInfo {
    constructor({ nameSelector, infoSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
        this._avatar = document.querySelector(avatarSelector);
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
        this._avatar.src = userInfo.avatar;
    }
    setUserAvatar(data){
        this._avatar.src = data.avatar;  
    }
}