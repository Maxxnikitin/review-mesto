//Импорт css файла
import './index.css';

import {Card} from '../components/Card.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {FormValidator} from '../components/FormValidator.js';
import {UserInfo} from '../components/UserInfo.js';

// Константы

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

// Врапперы
const placesWrap = document.querySelector('.places__list');
const editFormModalWindow = document.querySelector('.popup_type_edit');
const cardFormModalWindow = document.querySelector('.popup_type_new-card');
const imageModalWindow = document.querySelector('.popup_type_image');
// С submit ребята еще плохо работают.

// Кнопки и прочие дом узлы
const openEditFormButton = document.querySelector('.profile__edit-button');
const openCardFormButton = document.querySelector('.profile__add-button');

// DOM узлы профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Данные форм и элементы форм
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const buttonSubmitInfo = document.querySelector('#btn-info');
const buttonSubmitImg = document.querySelector('#btn-img');
// решение на минималках. Конечно, студент может корректно обобрать велью инпутов в форме.

const cardSelector = document.querySelector('.card-template');
const defaultFormConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//Попап с увеличенными фото
const popupBigPicture = new PopupWithImage(imageModalWindow);

//функция блокировки кнопки отправки при открытии попапа
const btnDisabled = (btn) => {
  btn.disabled = true;
  btn.classList.add(defaultFormConfig.inactiveButtonClass)
}

//Форма с добавлением фото
const openFormImage = new PopupWithForm(cardFormModalWindow, {
  submitForm: (item) => {
      const card = new Card(cardSelector, {
          data: item, handleCardClick: () => {
            popupBigPicture.open(item);
          }
      });
      const cardElement = card.getView();
      CardList.addItem(cardElement);
      openFormImage.close();
  }
},);

const openPicForm = function () {
  cardFormValidator.removeError(cardFormModalWindow);
  btnDisabled(buttonSubmitImg);
  openFormImage.open();
}

export const formProfileInfo = {
  profileAuthor: profileTitle,
  profileStatus: profileDescription,
};

//Форма с редактированием профиля
const userInfo = new UserInfo(formProfileInfo);
const openFormInfo = new PopupWithForm(editFormModalWindow, {
  submitForm: (item) => {
    userInfo.setUserInfo(item);
    openFormInfo.close();
  }
});

const openInfoForm = () => {
  const infoUser = userInfo.getUserInfo();
  nameInput.value = infoUser.name;
  jobInput.value = infoUser.info;
  cardFormValidator.removeError(editFormModalWindow);
  btnDisabled(buttonSubmitInfo);
  openFormInfo.open();
}

const CardList = new Section({
  initialCards, renderer: (item) => {
    const card = new Card(cardSelector, {
      data: item, handleCardClick: () => {
        popupBigPicture.open(item);
      }
    });
    const cardElement = card.getView();
    CardList.addItem(cardElement);
  }
}, placesWrap);

CardList.renderItems(initialCards);

const editFormValidator = new FormValidator(defaultFormConfig, editFormModalWindow);
const cardFormValidator = new FormValidator(defaultFormConfig, cardFormModalWindow);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();

openCardFormButton.addEventListener("click", () => openPicForm());
openEditFormButton.addEventListener("click", () => openInfoForm());
