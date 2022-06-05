import './index.css';
import {UserInfo} from '../components/UserInfo.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
export {Popup} from '../components/Popup.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {Card} from '../components/Card.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {selectorList, initialCards, addCardForm, addButton, editProfileForm, editButton, nameInput, aboutInput} from '../utils/constants.js';

const editProfileValidation = new FormValidator(selectorList, editProfileForm);
editProfileValidation.enableValidation();
const addCardValidation = new FormValidator(selectorList, addCardForm);
addCardValidation.enableValidation();

const functionZoomPopup = new PopupWithImage('.popup-photo');
functionZoomPopup.setEventListeners();

function handleCardClick(name, link) {
  functionZoomPopup.open(name, link);
}

const createCard =  (data) => {
const card = new Card({data, handleCardClick}, '.gallery-item-template');
  const cardElement = card.generateCard();
  return cardElement;
}

const addCard = new Section({data: initialCards, renderer: (item) => {
  const card = createCard(item);
  addCard.addItem(card);
}}, '.gallery');
addCard.renderItems();

const placeForm = new PopupWithForm({
  handleFormSubmit: (data) => {
    const newCard = createCard(data);
    addCard.addItem(newCard);
    placeForm.close(); 
    }
  },
  '.popup-add-card'
);
placeForm.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  infoSelector: '.profile__subtitle'
})

const profileForm = new PopupWithForm({
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data)
    profileForm.close();
    }
  },
  '.popup-edit-profile'
);
profileForm.setEventListeners();

function openPopupProfile() {
  const profileData = userInfo.getUserInfo();
  nameInput.value = profileData.name;
  aboutInput.value = profileData.about;
  profileForm.open();
}

editButton.addEventListener('click', () => {
  openPopupProfile();
})

addButton.addEventListener('click', () => {
  placeForm.open();
});