// read form element
let ALL_INPUT_VALID;

const form = document.getElementById('form');
const email = document.getElementById('email');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const phone = document.getElementById('mobile');
const username = document.getElementById('username');
const password = document.getElementById('password');
const ahvNumber = document.getElementById('ahv-number');
const confirmPassword = document.getElementById('confirmPassword');

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
        ALL_INPUT_VALID = false;
    }
}

function checkPhoneNumber(input) {
    const re = /(\b(0041|0)|\B\+41)(\s?\(0\))?(\s)?[1-9]{2}(\s)?[0-9]{3}(\s)?[0-9]{2}(\s)?[0-9]{2}\b/;
    if (re.test(input.value.trim())) {
        showSuccess(input)
    } else {
        showError(input, 'Phone number is not valid')
        ALL_INPUT_VALID = false;
    }
}

function checkAhvNumber(input) {
    const re = /[7][5][6][.][\d]{4}[.][\d]{4}[.][\d]{2}$/
    if (re.test(input.value.trim())) {
        showSuccess(input)
    } else {
        showError(input, 'AHV number is invalid')
        ALL_INPUT_VALID = false;
    }
}

function matchPassword(password, confirmPassword) {
    if (password.value != confirmPassword.value) {
        showError(password, 'Passwords must match');
        showError(confirmPassword, 'Passwords must match');
        ALL_INPUT_VALID = false;
    } else {
        console.log('is right')
        showSuccess(password);
        showSuccess(confirmPassword);
    }
}

// Check required fields
function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
            isRequired = true;
            ALL_INPUT_VALID = false;
        } else {
            showSuccess(input);
        }
    });

    return isRequired;
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input,
            `${getFieldName(input)} must be at least ${min} characters`
        );
        ALL_INPUT_VALID = false;
    } else if (input.value.length > max) {
        showError(input,
            `${getFieldName(input)} must be less than ${max} characters`
        );
        ALL_INPUT_VALID = false;
    } else {
        showSuccess(input);
    }
}

// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Validate form input elements
function validateForm() {
    if (!checkRequired([email, firstName, lastName, ahvNumber, phone, username, password, confirmPassword])) {
        checkLength(firstName, 3, 20);
        checkLength(lastName, 3, 20);
        checkLength(password, 6, 30);
        checkLength(confirmPassword, 6, 30);
        checkEmail(email);
        checkPhoneNumber(phone)
        checkAhvNumber(ahvNumber);
        matchPassword(password, confirmPassword);
    }
}

/**
 * Make a testcall after the page is loaded
 */
window.onload = () => {
    console.log(`Make test call to the server ...`);
    getWelcome().then(
        result => {
            console.log(`Response from server: ${result}`);
        },
        error => {
            console.log(error)
        });
}


// Event listeners
form.addEventListener('submit', function (e) {
    ALL_INPUT_VALID = true;
    //https://www.w3schools.com/jsref/event_preventdefault.asp
    e.preventDefault();
    //First validate form
    validateForm();
    //Send data
    if (ALL_INPUT_VALID) {
        let formData = {
            email: email.value,
            firstName: firstName.value,
            lastName: lastName.value,
            username: username.value,
            phoneNumber: phone.value,
            password: password.value,
            confirmPassword: confirmPassword.value,
            ahvNumber: ahvNumber.value
        }
        console.log(`All input is valid. Send data to server: 
      ${JSON.stringify(formData)}`);
        //Variant 2
        sendForm2(formData).then(
            result => {
                console.log(`Response from server: ${result}`);
                window.location.href = './confirm.html';
            }).catch(err => {
            console.log(`Error occurred: ${err}`)
        });
    } else {
        console.log("At least one validation failed. No data sent to contact-server.");
    }

});
