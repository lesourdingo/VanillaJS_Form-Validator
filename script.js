const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Show error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}


// Check required field
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if(input.value === '') {
            showError(input, `${getFieldname(input)} is required`);
            console.log(input.value, 'input');
        } else showSuccess(input);
    });
}

// Get fieldname
function getFieldname(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value)) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

// Check length
function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldname(input)} must be at least ${min} characters`)
    } else if(input.value.length > max) {
        showError(input, `${getFieldname(input)} must be less than ${max} characters`)
    } else showSuccess(input);
}

// Check passwors match
function checkPassword(input, input2) {
    if(input.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    }
}

// Event Listener
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkEmail(email);
    checkLength(username, 3, 15);
    checkLength(password, 6, 20);
    checkPassword(password, password2);
});