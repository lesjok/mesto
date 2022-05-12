//показать ошибку
const showInputError = (formElement, inputElement, errorMessage, params) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(params.inputErrorClass);
  errorElement.textContent = errorMessage;
};

//скрыть ошибку
const hideInputError = (formElement, inputElement, params) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(params.inputErrorClass);
  errorElement.textContent = '';
};

//валидация
const isValid = (formElement, inputElement, params) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, params);
  } else {
    hideInputError(formElement, inputElement, params);
  }
};

//невалидный инпут
const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid; 
  })
}

//блокировка и разблокировка кнопки 
const toggleButtonState = (inputList, buttonElement, params) => {
  if(hasInvalidInput(inputList)) {
    inactivateButton(buttonElement, params);
  } else {
    buttonElement.classList.remove(params.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

//блокировка кнопки
const inactivateButton = (buttonElement, params) => {
    buttonElement.classList.add(params.inactiveButtonClass);
    buttonElement.disabled = true;
}

//добавление события на инпут
const setEventListeners = (formElement, params) => {
  const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
  const buttonElements = formElement.querySelectorAll(params.submitButtonSelector);
  buttonElements.forEach(buttonElement => {
     toggleButtonState(inputList, buttonElement, params);
  })
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, params);
      buttonElements.forEach(buttonElement => {
        toggleButtonState(inputList, buttonElement, params);
      })
    });
  });
};

//сброс данных формы
const handleSubmit = (currentForm) =>{
  currentForm.reset();
}

//добавление события на форму
const enableValidation = (params) => {
  const formList = Array.from(document.querySelectorAll(params.formSelector));
  const buttonElements = formElement.querySelectorAll(params.submitButtonSelector);
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      buttonElements.forEach((buttonElement) => {
        inactivateButton(buttonElement, params);
      })  
    });
    setEventListeners(formElement, params);  
    handleSubmit(formElement);
  });
};

enableValidation({
  formSelector: ".form",
  inputSelector: ".popup__style",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__style_error",
});
