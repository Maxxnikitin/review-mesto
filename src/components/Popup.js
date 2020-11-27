export class Popup {
  constructor(popupSelector) {
    this.popupSelector = popupSelector;
    this.closeButton = this.popupSelector.querySelector('.popup__close');
    /* this.overlay = this.popupSelector.querySelector('.popup'); */
  }

  close() {
    this.remEventListeners()
    this.popupSelector.classList.remove('popup_is-opened');
  }

  open() {
    this.setEventListeners();
    this.popupSelector.classList.add('popup_is-opened');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  setEventListeners() {
    this.clickClose = this.close.bind(this);
    this.escClose = this. _handleEscClose.bind(this);
    //Закрытие попапа крестиком
    this.closeButton.addEventListener('click', this.clickClose);
    //закрытие попапа кнопкой Esc
    document.addEventListener('keydown', this.escClose);
    //Закрытие попапа по оверлею
    /* this.overlay.addEventListener('click', this.clickClose); */
  }

  //Удаление слушателей
  remEventListeners() {
    //Закрытие попапа крестиком
    this.closeButton.removeEventListener('click', this.clickClose);
    //закрытие попапа кнопкой Esc
    document.removeEventListener('keydown', this.escClose);
    //Закрытие попапа по оверлею
    /* this.overlay.removeEventListener('click', this.clickClose); */
  }
}
