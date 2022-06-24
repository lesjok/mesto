export class Card {
  constructor(data, actualUserId, {handleCardClick, handleLikeClick, handleDeleteCard}, cardSelector) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteCard = handleDeleteCard;
    this._cardSelector = cardSelector;
    this._actualUserId = actualUserId;
    this._likes = data.likes;
    this._cardId = data._id;
    this._owner = data.owner;
    this._element = this._getTemplate(); 
    this._likesCounter = this._element.querySelector('.gallery-item__count-of-likes');
    this._trashButton = this._element.querySelector('.gallery-item__trash');
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
    this._cardImage = this._element.querySelector('.gallery-item__img');
    this._element.querySelector('.gallery-item__name').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._showTrashButton()
    this.updateLikes(this._data);
    this._setEventListeners();
    return this._element;
  }
    openLikesInfo(likes) {
    this._likes = likes;
    this.updateLikes();
  }
  _setEventListeners() {
    this._trashButton.addEventListener('click', () => {  
    this._handleDeleteCard(this);
  })
    this._element.querySelector('.gallery-item__like').addEventListener('click', () => {
      this._handleLikeClick(this);
    });
    this._cardImage.addEventListener('click', () => {
    this._handleCardClick(this._name, this._link);
  })
  }
  _showTrashButton() {
    if (this._owner._id === this._actualUserId) {
      this._trashButton.classList.remove('invisible');
    } else {
      this._trashButton.classList.add('invisible');
    }
  }
  deleteCard() {
    this._element.remove();
    this._element = null;
  }
  cardId() {
    return this._cardId;
  }
  isLiked () {
    return this._likes.some((like) => like._id === this._actualUserId);
  }
  updateLikes() {
    this._likesCounter.textContent = String(this._likes.length);
    if (this.isLiked()) {

      this._element.querySelector('.gallery-item__like').classList.add('gallery-item__like-active');
    } else {
        this._element.querySelector('.gallery-item__like').classList.remove('gallery-item__like-active');
    }
  }
}