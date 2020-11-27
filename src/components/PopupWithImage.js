import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }

  open(data) {
    const popupImage = document.querySelector('.popup__image');
    const popupName = document.querySelector('.popup__caption');
    popupImage.src = data.link;
    popupImage.alt = data.name;
    popupName.textContent = data.name;
    super.open();
  }
}
