const toggleCheckbox = document.querySelector('input[name="switch"]');
const root = document.documentElement;

function enableDarkMode() {
  root.classList.add('dark-mode');
  document.body.style.backgroundColor = "black";
  document.body.style.color = "white";
  document.body.getElementsByClassName("formPage")[0].style.backgroundColor = "rgb(12, 12, 12)";
  document.body.getElementsByClassName("formPage")[0].style.color = "white";

  localStorage.setItem('darkModeEnabled', true);
}

function disableDarkMode() {
  root.classList.remove('dark-mode');
  document.body.style.backgroundColor = "skyblue";
  document.body.style.color = "black";
  document.body.getElementsByClassName("formPage")[0].style.backgroundColor = "white";
  document.body.getElementsByClassName("formPage")[0].style.color = "black";
  document.body.getElementsByClassName("darkinput")[0].style.color = "black";
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

function validateForm() {
  let valid = true;

  // Username
  const name = document.forms['myForm']["fname"].value;
  if (name.length < 5 || name.length > 20) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Username!',
      text: 'Length should be between 5 and 20 characters!',
    });
    valid = false;
    return; // Stop validation for other fields
  }

  // Phone number
  const phoneNumber = document.forms['myForm']["fphone"].value;
  if (phoneNumber.length !== 10) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Phone Number!',
      text: 'Phone number must be 10 digits',
    });
    valid = false;
    return; // Stop validation for other fields
  } else if (/^0+$/.test(phoneNumber)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Phone Number!',
      text: 'Phone number must not consist of all zeros',
    });
    valid = false;
    return; // Stop validation for other fields
  }

  // Password
  const password = document.forms['myForm']["fpass"].value;
  if (password.length < 7 || password.length > 12 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Password!',
      text: 'Password must be between 7 and 12 characters and include at least one lowercase letter, one uppercase letter, and one digit',
    });
    valid = false;
    return; // Stop validation for other fields
  }

  // Email
  const email = document.forms['myForm']["Email"].value;
  if (!validateEmail(email)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Email Address!',
      text: 'Please enter a valid email address with a popular domain (e.g., Gmail, Yahoo, Hotmail)',
    });
    valid = false;
    return; // Stop validation for other fields
  }

  // Date of Birth
  const dateOfBirth = document.forms['myForm']["DOB"].value;
  if (!validateDateOfBirth(dateOfBirth)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Date of Birth!',
      text: 'Please enter a valid date of birth in the format dd-mm-yyyy, and the applicant must be at least 10 years old',
    });
    valid = false;
    return; // Stop validation for other fields
  }

  Swal.fire({
    icon: 'success',
    title: 'Form Submitted!',
    text: 'Thank you for submitting the form.',
  });

  return valid;
}

function validateEmail(email) {
  const pattern = /^[^\s@]+@(gmail\.com|yahoo\.com|hotmail\.com)$/i;
  return pattern.test(email);
}

function validateDateOfBirth(dateString) {
  const parts = dateString.split("-");
  if (parts.length !== 3) return false;

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) return false;

  const dateOfBirth = new Date(year, month, day);
  if (dateOfBirth.toString() === 'Invalid Date') return false;

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set time to 00:00:00

  if (dateOfBirth > currentDate) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Date of Birth!',
      text: 'Future dates are not allowed',
    });
    return false;
  }

  const ageDiff = currentDate.getFullYear() - dateOfBirth.getFullYear();
  const monthDiff = currentDate.getMonth() - dateOfBirth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dateOfBirth.getDate())) {
    return ageDiff - 1 >= 10;
  }

  return ageDiff >= 10;
}

document.forms['myForm'].addEventListener('submit', function(event) {
  event.preventDefault();
  validateForm();
});
