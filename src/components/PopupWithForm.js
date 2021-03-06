import {Popup} from "./Popup.js"
export class PopupWithForm extends Popup {
    constructor({ handleFormSubmit }, popupSelector) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;          
        this._element = this._popup.querySelector('.form');
        this._inputList = this._element.querySelectorAll('.popup__style');
        this._buttonText = this._element.querySelector('.popup__submit');
        this._buttonDefaultText = this._buttonText.textContent;
    }
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }
    
    setEventListeners() {
        super.setEventListeners();          
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });       
    } 
    close() {
        super.close();
        this._element.reset();
    }
    loading(state) {
        if (state) {
            this._buttonText.textContent = 'Сохранение...';
        } else {
            this._buttonText.textContent = this._buttonDefaultText;
        }
    }
}