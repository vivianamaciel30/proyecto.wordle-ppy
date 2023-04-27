let intentos = 6;
let palabra = "APPLE"
const API = 'http://random-word-api.herokuapp.com/word?number=1&length=5&lang=es'

//FUNCION ASINCRONA
fetch(API).then(response => response.json())
    .then(response => {
        palabra = response[0].toUpperCase()
        console.log(palabra)
    })
    .catch(err => console.log(err))

const button = document.getElementById("guess-button");
button.addEventListener("click", intentar);

function leerIntento() {
    let intento = document.getElementById("guess-input").value;
    return intento.toUpperCase();
}

function intentar() {
    const INTENTO = leerIntento();
    if (INTENTO === palabra) {
        terminar('<h1>GANASTE!😀</h1>')
        return
    }
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';
    for (let i in palabra) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        SPAN.innerHTML = INTENTO[i];
        if (INTENTO[i] === palabra[i]) {
            //VERDE: #79b851
            SPAN.style.backgroundColor = 'green';
        } else if (palabra.includes(INTENTO[i])) {
            //AMARILLO: #f3c237
            SPAN.style.backgroundColor = 'yellow';
        } else {
            //GRIS: #a4aec4
            SPAN.style.backgroundColor = 'grey';
        }
        ROW.appendChild(SPAN)
    }
    GRID.appendChild(ROW);
    intentos--;
    if (intentos == 0) {
        terminar('<h1>PERDISTE!😖</h1>')
    }
}

function terminar(mensaje) {
    const INPUT = document.getElementById('guess-input');
    INPUT.disabled = true;
    button.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}