

document.addEventListener("DOMContentLoaded", () => {
    createSquares();
    getNewWord(); 

    let guessedWords = [[]];
    let availableSpace = 1;
    let word = "plane";
    let guessedWordCount = 0;

    const keys = document.querySelectorAll('.keyboard-row button');

    function getNewWord() {
        fetch(`https://palabras-aleatorias-public-api.herokuapp.com/random-by-length?length=5`)
            .then((response) => {
                return response.json();
            })
            .then(data => console.log(data))
            .then((res) => {
                word = res.word;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    function getCurrentWordArray() {
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords - 1];
    }

    function updateGuessedWords(letter) {
        const currentWordArray = getCurrentWordArray();

        if (currentWordArray && currentWordArray.length <= 4) {
            currentWordArray.push(letter);
            const availableSpaceElement = document.getElementById(String(availableSpace))
            availableSpace = availableSpace + 1;

            availableSpaceElement.textContent = letter;
        }
    }

    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter);

        if (!isCorrectLetter) {
            return "rgb(58, 58, 60)"
        }

        const letterInPosition = word.charAt(index)
        const isCorrectPosition = letter === letterInPosition

        if (isCorrectPosition) {
            return "rgb(83, 141, 78)"
        }
        return "rgb(181, 159, 59)"
    }

    function submitWord() {
        const currentWordArray = getCurrentWordArray();
        if (currentWordArray.length !== 5) {
            window.alert("La palabra tiene que tener al menos 5 letras");
        }
        const currentWord = currentWordArray.join("");
        fetch(`https://palabras-aleatorias-public-api.herokuapp.com/palabras-aleatorias?Word=${currentWord}`)
            .then((res) => {
                if (!res.ok) {
                    throw Error()
                } 
                const firstLetterId = guessedWordCount * 5 + 1;
                const interval = 200;
                currentWordArray.forEach((letter, index) => {
                    setTimeout(() => {
                        const tileColor = getTileColor(letter, index);

                        const letterId = firstLetterId + index;
                        const letterElement = document.getElementById(letterId);
                        letterElement.classList.add("animate__flipInX");
                        letterElement.style = `background-color:${tileColor};border-color${tileColor}`;
                    }, interval * index);
                });
                guessedWordCount += 1;
                if (currentWord === word) {
                    window.alert("Felicitaciones!")
                }

                if (guessedWords.length === 6) {
                    window.alert(`Oops! Te quedaste sin oportunidades! La palabra era: ${word}.`)
                }

                guessedWords.push([]);
            } ).catch(() => {
                window.alert("La palabra no es válida!");
            });

    } 

    function createSquares() {
                    const gameBoard = document.getElementById("board");
                    for (let index = 0; index < 30; index++) {
                        let square = document.createElement("div");
                        square.classList.add("square");
                        square.classList.add("animate__animated");
                        square.setAttribute("id", index + 1);
                        gameBoard.appendChild(square);

                    }
                }

    function deleteLetter() {
                    const currentWordArray = getCurrentWordArray();
                    const removedLetter = currentWordArray.pop()
                    guessedWords[guessedWords.length - 1] = currentWordArray

                    const lastLetterElement = document.getElementById(String(availableSpace - 1))

                    lastLetterElement.textContent = "";
                    availableSpace = availableSpace - 1;
                }

    for (let i = 0; i < keys.length; i++) {
            keys[i].onclick = ({ target }) => {
                const letter = target.getAttribute('data-key');

                if (letter === 'enter') {
                    submitWord();
                    return;
                }

                if (letter === 'del') {
                    deleteLetter();
                    return;
                }
                updateGuessedWords(letter);
            };

        }
    });

