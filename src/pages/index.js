import './index.css';
import {UserInfo} from '../components/UserInfo.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
export {Popup} from '../components/Popup.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {Card} from '../components/Card.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithConfirm} from '../components/PopupWithConfirm.js';
import {selectorList, addCardForm, addButton, editProfileForm, editButton, nameInput, aboutInput, popupAvatarButton, popupAvatarForm} from '../utils/constants.js';
import {Api} from '../components/Api.js';

const editProfileValidation = new FormValidator(selectorList, editProfileForm); //валидация
editProfileValidation.enableValidation();
const addCardValidation = new FormValidator(selectorList, addCardForm);
addCardValidation.enableValidation();
const changeAvatarValidation = new FormValidator(selectorList, popupAvatarForm);
changeAvatarValidation.enableValidation();

const functionZoomPopup = new PopupWithImage('.popup-photo'); //увеличение фото
functionZoomPopup.setEventListeners();

function handleCardClick(name, link) {
  functionZoomPopup.open(name, link);
}

let actualUserId = null;
const createCard =  (data) => { //создание карточки
const card = new Card(data, actualUserId, {handleCardClick, 
  handleLikeClick: (card) => {  //лайк
    if(card.isLiked()) {
      api.removeLike(data)
      .then((data) => {
        card.openLikesInfo(data.likes);
      })
      .catch(err => {
          console.log(`Ошибка при удалении лайка: ${err}`)
      });
    }
    else {
        api.setLike(data)
          .then((data) => {
            card.openLikesInfo(data.likes);
        })
          .catch(err => {
          console.log(`Ошибка лайка: ${err}`)
        });
      }
  },
  handleDeleteCard: (card) => { //удаление карточки
    popupDeleteCard.open();
    popupDeleteCard.setSubmitCallback(() => {
      api.deleteCard(card.cardId()) 
        .then(() => {
          card.deleteCard();
          popupDeleteCard.close();
        })
        .catch(err => {
          console.log(`Ошибка при удалении карточки: ${err}`)
        })
    });
  }
}, '.gallery-item-template');
  const cardElement = card.generateCard();
  return cardElement;
}
const popupDeleteCard = new PopupWithConfirm('.popup-delete');
popupDeleteCard.setEventListeners();

const placeForm = new PopupWithForm({ //попап добавления карточки
  handleFormSubmit: (data) => {
    placeForm.close();
    placeForm.loading(true);
    api.addCard(data)
    .then((res) => {
      const newCard = createCard(res);
      addCard.addItem(newCard);
    })
    .catch(err => {
      console.log(`Ошибка при добавлении карточки: ${err}`)
    })
    .finally(() => {
      placeForm.loading(false);
    })
    }
  },
  '.popup-add-card'
);
placeForm.setEventListeners();

popupAvatarButton.addEventListener('click', () => { 
  popupAvatarUser.open();
});
const popupAvatarUser = new PopupWithForm({  //попап изменения аватара профиля
  handleFormSubmit: (item) => {
    popupAvatarUser.loading(true);
    api.changeUserAvatar(item)
    .then(result => {    
      userInfo.setUserAvatar(result);
      popupAvatarUser.close();
    })
    .catch(err => {
      console.log(`Ошибка в ходе изменения аватара пользователя: ${err}`)
    })
    .finally(() => {
      popupAvatarUser.loading(false);
    })
  }
}, '.popup-avatar');
popupAvatarUser.setEventListeners();

const userInfo = new UserInfo({  //данные профиля
  nameSelector: '.profile__title',
  infoSelector: '.profile__subtitle',
  avatarSelector: '.profile__image'
})

const profileForm = new PopupWithForm({ //попап изменения информации о профиле
  handleFormSubmit: (data) => {  
    profileForm.close();
    profileForm.loading(true);
    api.editUserInfo(data)
    .then((res) => {
userInfo.setUserInfo(res)
    })
    .catch(err => {
        console.log(`Ошибка в профиле пользователя: ${err}`);
      })
    .finally(() => {
        profileForm.loading(false);
      })
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

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '546c3937-20fb-4281-b49f-cc46847c72d5',
    'Content-Type': 'application/json'
  }
}); 

const addCard = new Section({renderer: (item) => { //добавление карточек в галерею
  const card = createCard(item);
  addCard.addItem(card);
}}, '.gallery');

Promise.all([
  api.getInitialCards() ,
  api.getUser()
]).then(([cards, profile]) => {
  userInfo.setUserInfo(profile);
  userInfo.setUserAvatar(profile);
  actualUserId = profile._id;
  addCard.renderItems(cards);
})