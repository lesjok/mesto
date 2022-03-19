const formElement = document.querySelector('.popup__form');
const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.popup__close-button');
const nameInput = document.getElementById('input__name');
const jobInput = document.getElementById('input__about');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

function openPopup() {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', onDocumentKeyUp);
}

function closePopup() {
  popup.classList.remove('popup_opened');
  document.addEventListener('keyup', onDocumentKeyUp);
}

function onDocumentKeyUp(event) {
  if (event.key === 'Escape') {
    closePopup();
  }
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup();
}