export class FormValidator {
  constructor(obj, formElement) {
    this._formElement = formElement;
    this._input = obj.inputSelector;
    this._submitButton = obj.submitButtonSelector;
    this._inactiveButtonClass = obj.inactiveButtonClass;
    this._inputErrorClass = obj.inputErrorClass;
  }
  _isValid = (input) => {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  };
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
  };
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  };
  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._input));
    this._buttonElement = this._formElement.querySelector(this._submitButton);
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._inactivateButton(this._buttonElement);
      });
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  };
  _hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
      return !input.validity.valid; 
    })
  }
  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      this._inactivateButton(buttonElement);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
  _inactivateButton = (buttonElement) => {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
  }
  enableValidation = () => {
    this._setEventListeners();
  };
  resetErrors() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._input));
    this._inputList.forEach(input => {
      this._hideInputError(input);
    })
  }
}