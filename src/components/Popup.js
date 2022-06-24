export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');
  }
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      this.close();
    }
  }
  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
       this.close();
    })
    this._popup.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup_opened')) {
        this.close(evt.target);
      }
    })
  }
}