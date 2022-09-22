

document.addEventListener("DOMContentLoaded", () => {
    createSquares();

    let guessedWords = [[]];
    let availableSpace = 1;

    const keys = document.querySelectorAll('.keyboard-row button');

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick =({target}) => {
            const letter = target.getAttribute('data-key');
            updateGuessedWords(letter);
        };
        
    }

    function getCurrentWordArray(){
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords - 1];
    }

    function updateGuessedWords(letter){
        const currentWordArray = getCurrentWordArray();

        if  (currentWordArray && currentWordArray.length <= 4){
            currentWordArray.push(letter);
            const availableSpaceElement = document.getElementById(String(availableSpace))
            availableSpace = availableSpace + 1;

            availableSpaceElement.textContent = letter;
        }
    }

    function createSquares() {
        const gameBoard = document.getElementById("board");
        for (let index = 0; index < 30; index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);

        }
    }
});

let notas1 = parseInt(prompt("Ingrese la primer nota del alumno"))
let notas2 = parseInt(prompt("Ingrese la segunda nota del alumno"))
let notas3 = parseInt(prompt("Ingrese la tercera nota del alumno"))

let listadoNotas1 = [notas1, notas2, notas3];

function calcNotas(listadoNotas) {
    let sumadorDeNotas = 0;
    for (let i = 0; i < 3; i++) {
        sumadorDeNotas = sumadorDeNotas + listadoNotas[i];
        // sumadorDeNotas += listadoNotas[i]; es lo mismo que lo de arriba
    }
    const promedio = sumadorDeNotas / 3;
    console.log(promedio);

    if (promedio >= 7) {
        console.log("Aprobaste y aprobaste con un:" + promedio);
    } else {
        console.log("no aprobaste");
    }
}

calcNotas(listadoNotas1)

let palabrasList = [];
function palabras() {

    for (let i = 0; i <= 2; i++) {
        let palabra = prompt("Ingresa tu palabra: ");
        palabrasList.push(palabra);
    }
}

palabras();
console.log(palabrasList);