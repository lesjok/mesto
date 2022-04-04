const formElement = document.querySelector('.popup__form');
const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.popup__close-button');
const nameInput = document.querySelector('.popup__input_type_name');
const aboutInput = document.querySelector('.popup__input_type_about');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileSubtitle.textContent;
  // document.addEventListener('keyup', onDocumentKeyUp);
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

// function onDocumentKeyUp(event) {
//   event.key === 'Escape' || event.key === 'Enter' ? closePopup() : 'false'
// }

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = aboutInput.value;
    closePopup();
}