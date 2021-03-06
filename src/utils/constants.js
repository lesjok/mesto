export const initialCards = [
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
export const selectorList = {
  formSelector: '.form',
  inputSelector: '.popup__style',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__style_error',
};
export const popupInputTypeName = document.querySelector('.popup-add-card__input_type_name');
export const popupInputTypeLink = document.querySelector('.popup-add-card__input_type_link');
export const addCardForm = document.querySelector('.popup-add-card__form');
export const addButton = document.querySelector('.profile__button_type_add');
export const editProfileForm = document.querySelector('.popup-edit-profile__form');
export const popupAvatarForm = document.querySelector('.popup-avatar__form');
export const closeButtons = document.querySelectorAll('.popup__close-button');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const editButton = document.querySelector('.profile__button_type_edit');
export const nameInput = document.querySelector('.popup__style_type_name');
export const aboutInput = document.querySelector('.popup__style_type_about');
export const popupAvatarButton = document.querySelector('.profile__avatar');