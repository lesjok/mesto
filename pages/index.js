import {FormValidator} from './FormValidator.js'
import {Card} from './Card.js'

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

const imageModalWindow = document.querySelector('.popup-photo');
const gallery = document.querySelector('.gallery');

//закрытие попапов
const closePopup = (modalWindow) => {
  modalWindow.classList.remove('popup_opened');
  document.removeEventListener('keydown', onDocumentKeyDown);
}
const closeButtons = document.querySelectorAll('.popup__close-button');
closeButtons.forEach(closeButton => {
  closeButton.addEventListener('click', (evt) => {
    const parentNodeOfButton = evt.target.closest('.popup');
    closePopup(parentNodeOfButton);
  })
})

//открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', onDocumentKeyDown);
}

//перебор карточек
initialCards.forEach((item) => {
  const card = new Card(item, '.gallery-item-template');
  const cardElement = card.generateCard();
  gallery.append(cardElement);
}); 

//добавление карточки
const popupInputTypeName = document.querySelector('.popup-add-card__input_type_name');
const popupInputTypeLink = document.querySelector('.popup-add-card__input_type_link');
const addCardForm = document.querySelector('.popup-add-card__form');
const addCard = function (evt) {
  evt.preventDefault();
  const obj = {};
  obj.name = popupInputTypeName.value;
  obj.link = popupInputTypeLink.value;
  const card = new Card(obj, '.gallery-item-template');
  const cardElement = card.generateCard();
  gallery.prepend(cardElement);
  const closePopupParentElement = evt.target.closest('.popup');
  closePopup(closePopupParentElement);
  addCardForm.reset();
}
addCardForm.addEventListener('submit', addCard);

//попап добавления карточки
const addButton = document.querySelector('.profile__button_type_add');
const cardFormModalWindow= document.querySelector('.popup-add-card');
function openPopupAddCard() {
  openPopup(cardFormModalWindow);
}
addButton.addEventListener('click', openPopupAddCard);

//попап редактирования профиля
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileFormModalWindow = document.querySelector('.popup-edit-profile');
const editButton = document.querySelector('.profile__button_type_edit');
const nameInput = document.querySelector('.popup__style_type_name');
const aboutInput = document.querySelector('.popup__style_type_about');
function openPopupEditProfile() {
  openPopup(profileFormModalWindow);
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileSubtitle.textContent;
}
editButton.addEventListener('click', openPopupEditProfile);

//закрытие попапа по кнопке esc или ent
function onDocumentKeyDown(event) {
  if (event.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
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
    const parentNodeOfButton = evt.target.closest('.popup');
    if (parentNodeOfButton.classList.contains('popup-edit-profile')) {
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = aboutInput.value;
  } 
    closePopup(parentNodeOfButton);
}
formElement.addEventListener('submit', handleProfileFormSubmit);

const selectorList = {
  formSelector: '.form',
  inputSelector: '.popup__style',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__style_error',
};

const EditProfileForm = document.querySelector('.popup-edit-profile__form');
const editProfileValidation = new FormValidator(selectorList, EditProfileForm);
editProfileValidation.enableValidation();

const addCardValidation = new FormValidator(selectorList, addCardForm);
addCardValidation.enableValidation();