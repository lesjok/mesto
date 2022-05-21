class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.gallery-item')
    .cloneNode(true);
    return cardElement;
}
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners()
    this._element.querySelector('.gallery-item__name').textContent = this._name;
    this._element.querySelector('.gallery-item__img').src = this._link;
    return this._element;
  }
  _setEventListeners() {
    this._element.querySelector('.gallery-item__like').addEventListener('click', () => {
    this._likeClick();
  })
    this._element.querySelector('.gallery-item__trash').addEventListener('click', () => {
    this._deleteCard();
  })
    this._element.querySelector('.gallery-item__img').addEventListener('click', () => {
    this._zoomImage();
  })
  }
  _likeClick() {  
    this._element.querySelector('.gallery-item__like').classList.toggle('gallery-item__like-active');
  }
  _deleteCard() {
    this._element.closest('.gallery-item').remove();
  }
  _zoomImage() {
    openPopup(imageModalWindow);
    document.querySelector('.popup-photo__big-photo').src = this._link;
    document.querySelector('.popup-photo__text').textContent = this._name;
    document.querySelector('.popup-photo__big-photo').alt = this._name;
  }
}
export {Card}