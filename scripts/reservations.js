const form = document.querySelector('#reservations-form');
const previewEntries = document.querySelectorAll('#reservation-preview .preview-entry');
const nameField = document.querySelector('#client-name');
const emailField = document.querySelector('#client-email');
const phoneField = document.querySelector('#client-phone');
const dateField = document.querySelector('#client-date');
const allergensField = document.querySelector('#client-info');
const previewNameValue = document.querySelector('#contact-preview-name-value');
const previewEmailValue = document.querySelector('#contact-preview-email-value');
const previewPhoneValue = document.querySelector('#contact-preview-phone-value');
const previewDateValue = document.querySelector('#contact-preview-date-value');
const previewAllergensValue = document.querySelector('#contact-preview-allergens-value');
let previewActivated = false;

if (!form) { // ReqJ1 //
    console.log("No form has been detected")
    console.log(`Form value is ${form}`)
}


function updatePreview() { // ReqJ2 //
    const dict = window.translations?.[getSavedLocale()];

    const hasPreviewContent = [
        nameField.value,
        emailField.value,
        phoneField.value,
        dateField.value,
        allergensField.value
    ].some(value => value.trim() !== '');

    if (hasPreviewContent && !previewActivated) {
        previewActivated = true;
        previewEntries.forEach(entry => entry.classList.remove('is-hidden'));
    }

    if (!previewActivated) {
        return;
    }

    previewNameValue.textContent = nameField.value;
    previewEmailValue.textContent = emailField.value;
    previewPhoneValue.textContent = phoneField.value;
    previewDateValue.textContent = dateField.value ? formatDate(new Date(dateField.value), getSavedLocale()) : '';
    previewAllergensValue.textContent = allergensField.value;
}

function validateInput(field) { // ReqJ3 //
    field.classList.remove('valid', 'invalid');
    if (field.checkValidity()) {
        field.classList.add('valid');
        return true
    } else {
        field.classList.add('invalid'); // ReqJ6, Function is called on validateForm()//
        return false
    }
}

function checkCustomRules() {
    const name = document.querySelector('#client-name');
    const email = document.querySelector('#client-email');
    const date = document.querySelector('#client-date');

    const verifications = [name, email, date];
    var missingEntries = '';

    for (let index = 0; index < verifications.length; index++) {
        if (!validateInput(verifications[index])) {
            missingEntries += (" " + verifications[index].name);
        }
    }
    return missingEntries;
}

function validateForm() { // ReqJ5 //
    const missingEntries = checkCustomRules();
    const errorBox = document.getElementById('error-box');
    const form = document.getElementById('reservations-form');
    form.reportValidity(); // ReqJ4 //
    errorBox.classList.remove('visible');

    if (missingEntries != 0) {
        const errorText = "Faltan los siguientes valores por rellenar: " + missingEntries.trim().replaceAll(" ", ", ");
        errorBox.textContent = errorText;
        errorBox.classList.add('visible');
        return false;
    }

    return true;
}


