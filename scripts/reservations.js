const form = document.querySelector('#reservations-form');

if (!form) { // ReqJ1 //
    console.log("No form has been detected")
    console.log(`Form value is ${form}`)
}


function updatePreview() { // ReqJ2 //
    const name = document.querySelector('#client-name').value;
    const email = document.querySelector('#client-email').value;
    const phone = document.querySelector('#client-phone').value;
    const date = document.querySelector('#client-date').value;
    const newDate = new Date(date).toString();
    const alergens = document.querySelector('#client-info').value;

    const preview = document.querySelector('#reservation-preview');

    preview.innerHTML = `
    <h2 class="section-title">Vista previa de contacto</h2>
    <p><strong>Nombre: </strong>${name}</p>    
    <p><strong>Correo electrónico: </strong>${email}</p>
    <p><strong>Teléfono de contacto: </strong>${phone}</p>
    <p><strong>Fecha: </strong>${newDate}</p>
    <p><strong>Alérgenos: </strong> ${alergens}</p>
    `
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
        const errorText = "Faltan los siguientes valores por rellenar: " + missingEntries.trim();
        errorBox.textContent = errorText;
        errorBox.classList.add('visible');
        return false;
    }

    return true;
}


