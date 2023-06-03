// <-------------------------------------------Dark mode------------------------------------------->


const toggleCheckbox = document.querySelector('input[name="switch"]');

const root = document.documentElement;

function enableDarkMode() {
    document.body.style.backgroundColor = "black"
    document.body.style.color = "white"
    document.body.getElementsByClassName("formPage")[0].style.backgroundColor = " rgb(12, 12, 12)"
    document.body.getElementsByClassName("formPage")[0].style.color = "white"

    localStorage.setItem('darkModeEnabled', true);
}

function disableDarkMode() {
    root.classList.remove('dark-mode');

    document.body.style.backgroundColor = "skyblue"
    document.body.style.color = "black"
    document.body.getElementsByClassName("formPage")[0].style.backgroundColor = "white"
    document.body.getElementsByClassName("formPage")[0].style.color = "black"
    document.body.getElementsByClassName("darkinput")[0].style.color = "black"
    localStorage.setItem('darkModeEnabled', false);
}

function toggleDarkMode() {
    if (toggleCheckbox.checked) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
}

const darkModeEnabled = localStorage.getItem('darkModeEnabled');

if (darkModeEnabled && darkModeEnabled !== 'false') {
    toggleCheckbox.checked = true;
    enableDarkMode();
} else {
    toggleCheckbox.checked = false;
    disableDarkMode();
}

toggleCheckbox.addEventListener('change', toggleDarkMode);

// <-------------------------------------------form validation------------------------------------------->


function validateForm() {
    var returnval = true;
    // username
    var name = document.forms['myForm']["fname"].value;
    if (name.length <= 5 || name.length >= 20) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Username!',
            text: 'Length should be between 5 to 20!',
        })
        returnval = false;
    }
    //phone number
    var phone = document.forms['myForm']["fphone"].value;
    if (phone.length != 10) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Phone Number!',
            text: 'Phone number Must be 10 digits',
        })
        returnval = false;
    }


    // password
    var password = document.forms['myForm']["fpass"].value;
    function validatePassword(password) {
        if (password.length < 7 || password.length > 12) {
            return false;
        }

        if (!/[a-z]/.test(password)) {
            return false;
        }

        if (!/[A-Z]/.test(password)) {
            return false;
        }

        if (!/\d/.test(password)) {
            return false;
        }

        return true;
    }

    if (validatePassword(password)) {
        console.log("Password is valid.");
    } else {
        console.log("Password is invalid.");
        Swal.fire({
            icon: 'error',
            title: 'Invalid password!',
            text: 'Password must be between 7 to 12, A lowercase letter, A upper case letter, A number'

        })
        returnval = false;
    }


    // email
    var email = document.forms['myForm']["Email"].value;
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const isValidEmail = validateEmail(email);

    if (isValidEmail) {
        console.log("Valid email address");
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Invalid email address!',
            text: 'Valid Email Syntax is "Invalid email address!"',
        })
        returnval = false;
    }


    return returnval;
}

