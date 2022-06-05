import {Popup} from './Popup.js'
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup-photo__big-photo');
    this._popupCaption = this._popup.querySelector('.popup-photo__text');
  }
  open(name, link) {  
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupCaption.textContent = name;
    super.open();
  }
}