let passInput;
let LenInput;
let infoLength;
let btnGerar;
let chkLower;
let chkUpper;
let chkNumber;
let chkSymbol;

document.addEventListener('DOMContentLoaded', function() {
  const elemSelect = document.querySelector('#selectModo');

  if (elemSelect) {
    const storedMode = localStorage.getItem('modo-light-dark');

    if (storedMode === 'light' || storedMode === 'dark') {
      document.documentElement.setAttribute('modo-light-dark', storedMode);
      elemSelect.value = storedMode;
    } else if (storedMode === 'Sistema') {
      document.documentElement.removeAttribute('modo-light-dark');
      elemSelect.value = 'Sistema';
    }

    elemSelect.addEventListener('change', function() {
      if (elemSelect.value === 'light') {
        document.documentElement.setAttribute('modo-light-dark', 'light');
        localStorage.setItem('modo-light-dark', 'light');
      } else if (elemSelect.value === 'dark') {
        document.documentElement.setAttribute('modo-light-dark', 'dark');
        localStorage.setItem('modo-light-dark', 'dark');
      } else {
        document.documentElement.removeAttribute('modo-light-dark');
        localStorage.setItem('modo-light-dark', 'Sistema');
      }
    });
  }

  passInput = document.querySelector('#inputPasswordId');
  LenInput = document.querySelector('#inputLenghtId');
  infoLength = document.querySelector('label[for="inputLenghtId"]');
  btnGerar = document.querySelector('#gerarSenha');
  chkLower = document.querySelector('#LowerId');
  chkUpper = document.querySelector('#UpperId');
  chkNumber = document.querySelector('#NumberId');
  chkSymbol = document.querySelector('#SymbolId');

  if (infoLength && LenInput) {
    infoLength.innerHTML = LenInput.value;
    LenInput.addEventListener('input', () => {
      infoLength.innerHTML = LenInput.value;
    });
  }

  if (btnGerar) {
    btnGerar.addEventListener('click', () => {
      generatePassword(
        chkNumber.checked,
        chkSymbol.checked,
        chkLower.checked,
        chkUpper.checked,
        Number(LenInput.value)
      );
    });
  }

  // Contato page alert button
  const botao = document.querySelector('#alerta');
  if (botao) {
    botao.addEventListener('click', function(e) {
      e.preventDefault();
      alert('Pagina em construção');
    });
  }

});

function increaseFont() {
  const root = document.documentElement;
  const current = parseInt(getComputedStyle(root).fontSize, 10);
  if (current < 32) {
    root.style.fontSize = `${current + 2}px`;
  }
}

function decreaseFont() {
  const root = document.documentElement;
  const current = parseInt(getComputedStyle(root).fontSize, 10);
  if (current > 8) {
    root.style.fontSize = `${current - 2}px`;
  }
}

const numbers = [0,1,2,3,4,5,6,7,8,9];
const symbols = ['!','@','#','$','%','&'];
const caracteres = Array.from(Array(26)).map((_, i) => i + 97);
const LowerCaseCaracteres = caracteres.map((item) => String.fromCharCode(item));
const UpperCaseCaracteres = caracteres.map((item) => String.fromCharCode(item).toUpperCase());

const generatePassword = (
    hasNumbers,
    hasSymbols, 
    hasLowercase, 
    hasUppercase,
    length
) => {
    const newArray = [
        ...(hasNumbers ? numbers : []),
        ...(hasSymbols ? symbols : []),
        ...(hasLowercase ? LowerCaseCaracteres : []),
        ...(hasUppercase ? UpperCaseCaracteres : [])
    ];
    if (newArray.length === 0) return;
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * newArray.length);
        password += newArray[randomIndex];
    }

    passInput.value = password;
};

