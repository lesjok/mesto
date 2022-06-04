export class Card {
  constructor({data, handleCardClick}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
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
    this._cardImage = this._element.querySelector('.gallery-item__img');
    this._element.querySelector('.gallery-item__name').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    return this._element;
  }
  _setEventListeners() {
    this._element.querySelector('.gallery-item__like').addEventListener('click', () => {
    this._likeClick();
  })
    this._element.querySelector('.gallery-item__trash').addEventListener('click', () => {
    this._deleteCard();
  })
    this._cardImage.addEventListener('click', () => {
    this._handleCardClick(this._name, this._link);
  })
  }
  _likeClick() {  
    this._element.querySelector('.gallery-item__like').classList.toggle('gallery-item__like-active');
  }
  _deleteCard() {
    this._element.remove();
  }
}