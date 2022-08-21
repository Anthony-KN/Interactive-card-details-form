//Card Name
const lblName = document.querySelector('.card__front__details-name');
const inputName = document.querySelector('#cardholder');
let divErrorName = document.querySelector('.form__cardholder-error');

//Card Number
const lblCard = document.querySelector('.card__front__number');
const inputCard = document.querySelector('#cardNumber');
let divErrorCard = document.querySelector('.form__cardNumber-error');

//MM
const lblMonth = document.querySelector('.card__front__month');
const inputMonth = document.querySelector('#cardMonth');
let divErrorMonth = document.querySelector('.form__input-mm--error');

//YY
const lblYear = document.querySelector('.card__front__year');
const inputYear = document.querySelector('#cardYear');
let divErrorYear = document.querySelector('.form__input-yy--error');

//CVC
const lblCvc = document.querySelector('.card__back__cvc');
const inputCvc = document.querySelector('#cardCvc');
let divErrorCvc = document.querySelector('.form__input-cvc--error');

//Btn Submit
const btnSubmit = document.querySelector('.form__submit');

//Expresion regular - CardNumber
let regExp = /[A-z]/g;

//Ingreso dinamico del nombre
inputName.addEventListener('input', () => {
    if (inputName.value == '') {
        lblName.innerText = 'JANE APPLESEED';
    } else {
        lblName.innerText = inputName.value;
    }
});

//Igreso dinamico del numero
inputCard.addEventListener('input', (event) => {
    /*  console.log(event); */
    //Actulizando graficamente la tarjeta, si inputCard es diferente a vacio
    lblCard.innerText = inputCard.value;

    //Validacion de letra
    if (regExp.test(inputCard.value)) {
        showError(inputCard, divErrorCard, 'Wrong format, numbers only', true);
    } else {
        //Agrega 4 espacios cada 4 digitos al input, borra espacios ingresados por el usuario y,
        //borrando el espacio al principio y final de toda la serie de umeros de la tarjeta
        inputCard.value = inputCard.value
            .replace(/\s/g, '')
            .replace(/([0-9]{4})/g, '$1 ')
            .trim();
        showError(inputCard, divErrorCard, '', false);
    }
    //Mostrando los 0s por defecto cuando el input no se ha ingresado nada
    if (inputCard.value == '') {
        lblCard.innerText = '0000 0000 0000 0000';
    }
});

//Ingreso dinamico de mes
inputMonth.addEventListener('input', (event) => {
    lblMonth.innerText = inputMonth.value;
    lettersCheck(inputMonth, divErrorMonth);
});

//Ingreso dinamico del año
inputYear.addEventListener('input', () => {
    lblYear.innerText = inputYear.value;
    lettersCheck(inputYear, divErrorCvc);
});

//Ingreso dinamico del CVC
const eventCvc = () => {
    lblCvc.innerText = inputCvc.value;
    lettersCheck(inputCvc, divErrorCvc);
};
inputCvc.addEventListener('input', eventCvc);

let validateName,
    validateCard,
    validateMonth,
    validateYear,
    validateCvc = false;

//Evento click validacion
const eventClick = (event) => {
    //detiene la actulizacion del form cuando al boton le dan un click
    event.preventDefault();

    //Validar Name
    if (veryfyIsFilled(inputName, divErrorName)) {
        validateName = true;
    } else {
        validateName = false;
    }

    //Validar Numero
    if (veryfyIsFilled(inputCard, divErrorCard) == true) {
        if (inputCard.value.length == 19) {
            showError(inputCard, divErrorCard, '', false);
            validateCard = true;
        } else {
            showError(inputCard, divErrorCard, 'Wrong format, incomplete', true);
            validateCard = false;
        }
    }

    //Validar Mes
    if (veryfyIsFilled(inputMonth, divErrorMonth) == true) {
        if (parseInt(inputMonth.value) > 0 && parseInt(inputMonth.value) <= 12) {
            showError(inputMonth, divErrorMonth, '', false);
            validateMonth = true;
        } else {
            showError(inputMonth, divErrorMonth, 'Wrong Month', true);
            validateMonth = false;
        }
    }

    //Validar año
    if (veryfyIsFilled(inputYear, divErrorYear) == true) {
        if (parseInt(inputYear.value) > 22 && parseInt(inputYear.value) <= 27) {
            showError(inputYear, divErrorYear, '', false);
            validateYear = true;
        } else {
            showError(inputYear, divErrorYear, 'Wrong Year', true);
            validateYear = false;
        }
    }
    //Validar cvc
    if (veryfyIsFilled(inputCvc, divErrorCvc)) {
        if (inputCvc.value.length == 3) {
            showError(inputCvc, divErrorCvc, '', false);
            validateCvc = true;
        } else {
            showError(inputCvc, divErrorCvc, 'Wrong CVC', true);
            validateCvc = false;
        }
    }

    //Validacion que todos los input se hayan llenado
    const formCard = document.querySelector('.form');
    const thanksSection = document.querySelector('.thanks-section');
    if (
        validateName == true &&
        validateCard == true &&
        validateMonth == true &&
        validateYear == true &&
        validateCvc == true
    ) {
        formCard.style.display = 'none';
        thanksSection.style.display = 'block';
    }
};
btnSubmit.addEventListener('click', eventClick);

//Funcion de validacion - Si esta vacio el input
const veryfyIsFilled = (inputError, divError) => {
    if (inputError.value.length > 0) {
        showError(inputError, divError, '', false);
        return true;
    } else {
        showError(inputError, divError, "Cant't be blank", true);
        return false;
    }
};

//Funcion de validacion - msgError
const showError = (inputError, divError, msgError, showBoolean) => {
    if (showBoolean) {
        divError.innerText = msgError;
        inputError.style.borderColor = '#FF0000';
    } else {
        divError.innerText = msgError;
        inputError.style.borderColor = 'hsl(270, 3%, 87%)';
    }
};
//Funcion de validacion - Sin letras
const lettersCheck = (inputCheked, errorCheked) => {
    //Validacion de letra
    if (regExp.test(inputCheked.value)) {
        showError(inputCheked, errorCheked, 'Wrong format, numbers only', true);
    } else {
        showError(inputCheked, errorCheked, '', false);
    }
};
