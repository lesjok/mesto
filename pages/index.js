import {FormValidator} from './FormValidator.js';
import {Card} from './Card.js';
import {initialCards} from './initialCards.js'
export const imageModalWindow = document.querySelector('.popup-photo');
const selectorList = {
  formSelector: '.form',
  inputSelector: '.popup__style',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__style_error',
};
const gallery = document.querySelector('.gallery');
const popupInputTypeName = document.querySelector('.popup-add-card__input_type_name');
const popupInputTypeLink = document.querySelector('.popup-add-card__input_type_link');
const addCardForm = document.querySelector('.popup-add-card__form');
const addButton = document.querySelector('.profile__button_type_add');
const cardFormModalWindow= document.querySelector('.popup-add-card');
const editProfileForm = document.querySelector('.popup-edit-profile__form');
const closeButtons = document.querySelectorAll('.popup__close-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileFormModalWindow = document.querySelector('.popup-edit-profile');
const editButton = document.querySelector('.profile__button_type_edit');
const nameInput = document.querySelector('.popup__style_type_name');
const aboutInput = document.querySelector('.popup__style_type_about');
const editProfileValidation = new FormValidator(selectorList, editProfileForm);
editProfileValidation.enableValidation();
const addCardValidation = new FormValidator(selectorList, addCardForm);
addCardValidation.enableValidation();

//закрытие попапов
const closePopup = (modalWindow) => {
  modalWindow.classList.remove('popup_opened');
  document.removeEventListener('keydown', onDocumentKeyDown);
}
closeButtons.forEach(closeButton => {
  closeButton.addEventListener('click', (evt) => {
    const parentNodeOfButton = evt.target.closest('.popup');
    closePopup(parentNodeOfButton);
  })
})

//открытие попапа
export default function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', onDocumentKeyDown);
}

//создание карточки
const createCard = function(obj) {
const card = new Card(obj, '.gallery-item-template');
  const cardElement = card.generateCard();
  return cardElement;
}

//перебор и добавление существующих карточек
initialCards.forEach((item) => {
  gallery.append(createCard(item));
})

//добавление карточки
const addCard = function (evt) {
  evt.preventDefault();
  const obj = {};
  obj.name = popupInputTypeName.value;
  obj.link = popupInputTypeLink.value;
  gallery.prepend(createCard(obj));
  closePopup(cardFormModalWindow);
  addCardForm.reset();
}

//попап добавления карточки
function openPopupAddCard() {
  openPopup(cardFormModalWindow);
}

//попап редактирования профиля
function openPopupEditProfile() {
  openPopup(profileFormModalWindow);
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileSubtitle.textContent;
}

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

//отправка формы
const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = aboutInput.value;
    closePopup(profileFormModalWindow);
}

addButton.addEventListener('click', openPopupAddCard);
addCardForm.addEventListener('submit', addCard);
editButton.addEventListener('click', openPopupEditProfile);
cardFormModalWindow.addEventListener('click', handleClickOverlay);
imageModalWindow.addEventListener('click', handleClickOverlay);
profileFormModalWindow.addEventListener('click', handleClickOverlay);
editProfileForm.addEventListener('submit', handleProfileFormSubmit);