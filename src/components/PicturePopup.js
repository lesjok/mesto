import {Popup} from './Popup.js'
export class PicturePopup extends Popup {
  constructor(popup) {
    super(popup);
    this._popupImage = document.querySelector('.popup-photo__big-photo');
    this._popupCaption = document.querySelector('.popup-photo__text');
  }
  open(name, link) {  
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupCaption.textContent = name;
    super.open();
  }
}