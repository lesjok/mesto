const popups = document.querySelectorAll('.popup');
const template = document.querySelector('.gallery-item-template');
const popupImg = document.querySelector('.popup-photo');
const bigPhoto = document.querySelector('.popup-photo__big-photo');
const popupImgText = document.querySelector('.popup-photo__text');


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


//закрытие попапов
const closeButtons = document.querySelectorAll('.popup__close-button');
closeButtons.forEach(closeButton => {
  closeButton.addEventListener('click', closePopup);
})
function closePopup() {
  popups.forEach(popup => {
    popup.classList.remove('popup_opened');
  })
}


//создание карточек
const createCards = (card) => {
  const item = template.content.querySelector('.gallery-item').cloneNode(true);
  item.querySelector('.gallery-item__img').src = card.link;
  item.querySelector('.gallery-item__img').alt = card.name;
  item.querySelector('.gallery-item__name').textContent = card.name;
  //лайк
  const likeButton = item.querySelector('.gallery-item__like');
  likeButton.addEventListener('click', (evt) => {
  evt.target.classList.toggle('gallery-item__like-active');
});
  //удаление карточки
  const trash = item.querySelector('.gallery-item__trash');
  trash.addEventListener('click', function(evt) {
  evt.target.parentElement.remove();
})
  //увеличение картинки
  item.querySelector('.gallery-item__img').addEventListener('click', function() {
  openPopup(popupImg);
  bigPhoto.src = card.link;
  popupImgText.textContent = card.name;
  bigPhoto.alt = card.name;
})
  return item;
}


//перебор карточек
const gallery = document.querySelector('.gallery');
const elements = initialCards.map(function(item) {
  return createCards(item);
})
gallery.append(...elements);


//добавление карточки
const popupInputTypeName = document.querySelector('.popup__input-add-item_type_name');
const popupInputTypeLink = document.querySelector('.popup__input-add-item_type_link');
const addCardForm = document.querySelector('.popup__form_add-card');
const addCard = function (evt) {
  evt.preventDefault();
  const card = {};
  card.name = popupInputTypeName.value;
  card.link = popupInputTypeLink.value;
  gallery.prepend(createCards(card));
  closePopup();
  addCardForm.reset();
}
addCardForm.addEventListener('submit', addCard);


//попап добавления карточки
const addButton = document.querySelector('.profile__add-button');
const addCardPopup= document.querySelector('.popup-add-item');
function openPopupAddCard() {
  openPopup(addCardPopup);
}
addButton.addEventListener('click', openPopupAddCard);


//попап редактирования профиля
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const editProfilePopup = document.querySelector('.popup-edit-profile');
const editButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__input_type_name');
const aboutInput = document.querySelector('.popup__input_type_about');
function openPopupEditProfile() {
  openPopup(editProfilePopup);
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileSubtitle.textContent;
  // document.addEventListener('keyup', onDocumentKeyUp);
}
editButton.addEventListener('click', openPopupEditProfile);


// function onDocumentKeyUp(event) {
//   event.key === 'Escape' || event.key === 'Enter' ? closePopup() : 'false'
// }


//открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}


//отправка формы
const formElement = document.querySelector('.popup__form');
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = aboutInput.value;
    closePopup();
}
formElement.addEventListener('submit', handleProfileFormSubmit);