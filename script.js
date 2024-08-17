const ps = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!$%&|[](){}:;.,*+-#@<>~'
};

const passwordLenght = document.querySelector('.pass-length input');
const passwordDetails = document.querySelector('.pass-length .details span');
const passwordIndicator = document.querySelector('.pass-indicator');
const passworInput = document.querySelector('.input-box input');
const generateBtn = document.querySelector('.generate-btn');
const copyBtn = document.querySelector('.input-box span');

const randomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const shuffleString = (str) => str.split('').sort(function(){return 0.5 - Math.random()}).join('');

const copyPassword = () => {
    navigator.clipboard.writeText(passworInput.value);
    copyBtn.textContent = 'check';
    setTimeout(function() {
        copyBtn.textContent = 'copy_all';
    }, 1000)
}

const restorePasswordOptions = () => {
    if(localStorage.getItem('passwordOptions')) {
        const passwordOptions = JSON.parse(localStorage.getItem('passwordOptions'));

        uppercase.checked = passwordOptions['uppercase'];
        numbers.checked = passwordOptions['numbers'];
        symbols.checked = passwordOptions['symbols'];
        passwordLenght.value = passwordOptions.length;

    }
}

const savePasswordOptions = () => {
    const passwordOptions = {};

    passwordOptions['length'] = +passwordLenght.value;
    passwordOptions['uppercase'] = uppercase.checked;
    passwordOptions['numbers'] = numbers.checked;
    passwordOptions['symbols'] = symbols.checked;
    localStorage.setItem('passwordOptions', JSON.stringify(passwordOptions));

}

const updatePasswordIndicator = (l) => {
    passwordDetails.textContent = l;
    passwordIndicator.classList.remove('strong', 'medium');
    if(l >= 16) passwordIndicator.classList.add('strong');
    else if(l >= 8) passwordIndicator.classList.add('medium');
}

const generatePassword = () => {
    savePasswordOptions();
    const length = +passwordLenght.value;
    updatePasswordIndicator(length);

    let passString = shuffleString(ps.lowercase);
    if(uppercase.checked) passString = shuffleString(passString + ps.uppercase);
    if(numbers.checked) passString = shuffleString(passString + ps.numbers);
    if(symbols.checked) passString = shuffleString(passString + ps.symbols);

    let randomPassword = '';

    for(let i = 0; i < length; i++) {
        passString = shuffleString(passString);
        let random = randomInteger(0, passString.length - 1);
        randomPassword += passString[random];
    }
    passworInput.value = randomPassword;

}

restorePasswordOptions();

passwordLenght.oninput = generatePassword;
generateBtn.onclick = generatePassword;
generatePassword();
copyBtn.onclick = copyPassword;
