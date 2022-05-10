const template = document.querySelector('.gallery-item-template');
const imageModalWindow = document.querySelector('.popup-photo');
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
const closePopup = (modalWindow) => {
  modalWindow.classList.remove('popup_opened');
}
const closeButtons = document.querySelectorAll('.popup__close-button');
closeButtons.forEach(closeButton => {
  closeButton.addEventListener('click', (evt) => {
    const parentNodeOfButton = evt.target.parentNode.parentNode;
    closePopup(parentNodeOfButton);
  })
})


//открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
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
  openPopup(imageModalWindow);
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
const popupInputTypeName = document.querySelector('.popup-add-card__input_type_name');
const popupInputTypeLink = document.querySelector('.popup-add-card__input_type_link');
const addCardForm = document.querySelector('.popup-add-card__form');
const addCard = function (evt) {
  evt.preventDefault();
  const card = {};
  card.name = popupInputTypeName.value;
  card.link = popupInputTypeLink.value;
  gallery.prepend(createCards(card));
  const closePopupParentElement = evt.target.parentElement.parentElement;
  closePopup(closePopupParentElement);
  addCardForm.reset();
}
addCardForm.addEventListener('submit', addCard);


//попап добавления карточки
const addButton = document.querySelector('.profile__button_type_add');
const cardFormModalWindow= document.querySelector('.popup-add-card');
function openPopupAddCard() {
  openPopup(cardFormModalWindow);
  document.addEventListener('keyup', onDocumentKeyUp);
}
addButton.addEventListener('click', openPopupAddCard);


//попап редактирования профиля
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileFormModalWindow = document.querySelector('.popup-edit-profile');
const editButton = document.querySelector('.profile__button_type_edit');
const nameInput = document.querySelector('.popup__style_type_name');
const aboutInput = document.querySelector('.popup__input_type_about');
function openPopupEditProfile() {
  openPopup(profileFormModalWindow);
  document.addEventListener('keyup', onDocumentKeyUp);
}
editButton.addEventListener('click', openPopupEditProfile);


//закрытие попапа по кнопке esc или ent
function onDocumentKeyUp(event) {
  ENTER_KEYCODE = 13;
  if (event.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  } else if (event.keyCode === ENTER_KEYCODE) {
    closePopup(cardFormModalWindow);
  }
}

//закрытие по overlay
const handleClickOverlay = (evt) => {
  if(evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}
cardFormModalWindow.addEventListener('click', handleClickOverlay);
imageModalWindow.addEventListener('click', handleClickOverlay);
profileFormModalWindow.addEventListener('click', handleClickOverlay);


//отправка формы
const formElement = document.querySelector('.form');
const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = aboutInput.value;
    const parentNodeOfButton = evt.target.parentNode.parentNode;
    closePopup(parentNodeOfButton);
}
formElement.addEventListener('submit', handleProfileFormSubmit);