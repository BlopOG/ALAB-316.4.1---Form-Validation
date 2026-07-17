// Cache DOM Forms 
const errorDisplay = document.getElementById('errorDisplay');
const regForm = document.getElementById('registration');
const loginForm = document.getElementById('login');
// Messaging Functions
function displayMessage(message, inputElement = null, isSuccess = false) {
    errorDisplay.innerHTML = message;
    errorDisplay.style.display = 'block';
    
    if (isSuccess) {
        errorDisplay.className = 'success';

        errorDisplay.style.backgroundColor = '#d4edda';

        errorDisplay.style.color = '#155724';

        errorDisplay.style.padding = '10px';
        errorDisplay.style.marginTop = '15px';
    } else {
        errorDisplay.className = 'error';

        errorDisplay.style.backgroundColor = '#f8d7da';

        errorDisplay.style.color = '#721c24';
        errorDisplay.style.padding = '10px';
        errorDisplay.style.marginTop = '15px';
        if (inputElement) {
            inputElement.focus();
        }
    }
}
function clearMessage() {
    errorDisplay.innerHTML = '';
    errorDisplay.style.display = 'none';
    errorDisplay.className = '';
}

function getStoredUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : {};
}


// Registration validation engine 

regForm.addEventListener('submit', function(e) {
    e.preventDefault();
    clearMessage();
});

    // Safely target inputs using their 'name' attribute inside this form
    const usernameInput = regForm.elements['username'];
    const emailInput = regForm.elements['email'];
    const passwordInput = regForm.elements['password'];
    const passwordCheckInput = regForm.elements['passwordCheck'];
    const termsInput = regForm.elements['terms'];

    const usernameVal = usernameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const passwordVal = passwordInput.value;
    const passwordCheckVal = passwordCheckInput.value;
    //Username validation
    if (!usernameVal) {
        return displayMessage('Username cannot be blank.', usernameInput);
    }
    if (usernameVal.length < 4) {
        return displayMessage('Username must be at least 4 characters long.', usernameInput);
    }
    
    const uniqueChars = new Set(usernameVal);
    if (uniqueChars.size < 2) {
        return displayMessage('Username must contain at least two unique characters.', usernameInput);
    }

    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(usernameVal)) {
        return displayMessage('Username cannot contain special characters or whitespace.', usernameInput);
    }

    //  EMAIL VALIDATION 
    if (!emailVal.includes('@') || !emailVal.includes('.')) {
        return displayMessage('Please enter a valid email address.', emailInput);
    }
    if (emailVal.toLowerCase().endsWith('example.com')) {
        return displayMessage('Registration from the "example.com" domain is not permitted.', emailInput);
    }
    // Password Validation
    if (passwordVal.length < 12) {
        return displayMessage('Password must be at least 12 characters long.', passwordInput);
    }
    if (!/[A-Z]/.test(passwordVal)) {
        return displayMessage('Password must contain at least one uppercase letter.', passwordInput);
    }
    if (!/[a-z]/.test(passwordVal)) {
        return displayMessage('Password must contain at least one lowercase letter.', passwordInput);
    }
    if (!/[0-9]/.test(passwordVal)) {
        return displayMessage('Password must contain at least one numerical digit.', passwordInput);
    }
    if (!/[!@#$%^&*(),.?":{}|<>_+\-]/.test(passwordVal)) {
        return displayMessage('Password must contain at least one special character.', passwordInput);
    }
    if (passwordVal.toLowerCase().includes('password')) {
        return displayMessage('Password cannot contain the word "password".', passwordInput);
    }
    if (passwordVal.includes(usernameVal)) {
        return displayMessage('Password cannot contain your exact username.', passwordInput);
    }
    if (passwordVal !== passwordCheckVal) {
        return displayMessage('Passwords do not match.', passwordCheckInput);
    }

    // Terms and Condition
    if (!termsInput.checked) {
        return displayMessage('You must accept the Terms and Conditions to proceed.', termsInput);
    }