import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, {submitForm}) {
    super(popupSelector);
    this.submitForm = submitForm;
  }

  _getInputValues() {
    const item = {
      name: this.popupSelector.querySelector('.popup__input_type_name').value,
      link: this.popupSelector.querySelector('.popup__input_type_description').value
    };
    return item;
  }

  setEventListeners() {
    this._submit = this._setSubmitForm.bind(this);
    this.popupSelector.addEventListener('submit', this._submit, {once: true});
    super.setEventListeners();
  }

  close() {
    this.popupSelector.removeEventListener('submit', this.submitForm);
    this.popupSelector.querySelector('form').reset();
    super.close();
  }

  _setSubmitForm(evt) {
    evt.preventDefault();
    this.submitForm(this._getInputValues());
  }
}
