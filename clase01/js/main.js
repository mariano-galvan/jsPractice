document.addEventListener("DOMContentLoaded", () => {

    let guessedWords = [[]];
    let currentWordIndex = 0;
    let guessedWordCount = 0;
    let availableSpace = 1;
    const words = ["zorro", "felpa", "pulpo", "cosas", "dorso"];
    let currentWord = words[currentWordIndex];

    initLocalStorage();
    initHelpModal();
    initStatsModal();
    createSquares();
    addKeyboardClicks();

    

    function initLocalStorage() {
        const storedCurrentWordIndex = window.localStorage.getItem("currentWordIndex");
        if (!storedCurrentWordIndex) {
            window.localStorage.setItem("currentWordIndex", currentWordIndex);
        } else {
            currentWordIndex = Number(storedCurrentWordIndex);
            currentWord = words[currentWordIndex];
        }
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

    function getCurrentWordArray() {
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords - 1];
    }

    function updateGuessedWords(letter) {
        const currentWordArray = getCurrentWordArray();

        if (currentWordArray && currentWordArray.length <= 4) {
            currentWordArray.push(letter);
            const availableSpaceElement = document.getElementById(String(availableSpace))


            availableSpaceElement.textContent = letter;
            availableSpace = availableSpace + 1;
        }
    }

    function showResult() {
        const finalResultEl = document.getElementById("final-score");
        finalResultEl.textContent = "Wordle 1 - Acertaste!";
    }

    function showLosingResult() {
        const finalResultEl = document.getElementById("final-score");
        finalResultEl.textContent = `Wordle 1 - No la pudiste adivinar!`;
    }

    function clearBoard() {
        for (let i = 0; i < 30; i++) {
            let square = document.getElementById(i + 1);
            square.textContent = "";
        }

        const keys = document.getElementsByClassName("keyboard-button");

        for (var key of keys) {
            key.disabled = true;
        }
    }

    function getIndicesOfLetter(letter, arr) {
        const indices = [];
        let idx = arr.indexOf(letter);
        while (idx != -1) {
            indices.push(idx);
            idx = arr.indexOf(letter, idx + 1);
        }
        return indices;
    }

    function getTileClass(letter, index, currentWordArray) {
        const isCorrectLetter = currentWord
            .toUpperCase()
            .includes(letter.toUpperCase());

        if (!isCorrectLetter) {
            return "incorrect-letter";
        }

        const letterInThatPosition = currentWord.charAt(index);
        const isCorrectPosition =
            letter.toLowerCase() === letterInThatPosition.toLowerCase();

        if (isCorrectPosition) {
            return "correct-letter-in-place";
        }
        const isGuessedMoreThanOnce =
            currentWordArray.filter((l) => l === letter).length > 1;


        if (!isGuessedMoreThanOnce) {
            return "correct-letter";
        }

        const existsMoreThanOnce =
            currentWord.split("").filter((l) => l === letter).length > 1;


        if (existsMoreThanOnce) {
            return "correct-letter";
        }

        const hasBeenGuessedAlready = currentWordArray.indexOf(letter) < index;

        const indices = getIndicesOfLetter(letter, currentWord.split(""));
        const otherIndices = indices.filter((i) => i !== index);
        const isGuessedCorrectlyLater = otherIndices.some(
            (i) => i > index && currentWordArray[i] === letter
        );

        if (!hasBeenGuessedAlready && !isGuessedCorrectlyLater) {
            return "correct-letter";
        }

        return "incorrect-letter";
    }

    function updateWordIndex(){
        window.localStorage.setItem("currentWordIndex", currentWordIndex + 1);
    }

    async function submitWord() {
        const currentWordArray = getCurrentWordArray();
        const guessedWord = currentWordArray.join("");

        if (guessedWord.length !== 5) {
            return;
        }

        try {
            const firstLetterId = guessedWordCount * 5 + 1;

            const interval = 200;
            currentWordArray.forEach((letter, index) => {
                setTimeout(() => {
                    const tileClass = getTileClass(letter, index, currentWordArray);
                    if (tileClass) {
                        const letterId = firstLetterId + index;
                        const letterEl = document.getElementById(letterId);
                        letterEl.classList.add("animate__flipInX");
                        letterEl.classList.add(tileClass);
                        const keyboardEl = document.querySelector(`[data-key=${letter}]`);
                        keyboardEl.classList.add(tileClass);
                    }
                }, index * interval);
            });

            guessedWordCount += 1;

            if (guessedWord === currentWord) {
                setTimeout(() => {
                    const okSelected = window.confirm("Bien ahí!");
                    if (okSelected) {
                        clearBoard();
                        showResult();
                        updateWordIndex();
                    }
                    return;
                }, 1200);
            }

            if (guessedWords.length === 6 && guessedWord !== currentWord) {
                setTimeout(() => {
                    const okSelected = window.confirm(
                        `Te quedaste sin mas intentos, la palabra era: "${currentWord.toUpperCase()}".`
                    );
                    if (okSelected) {
                        clearBoard();
                        showLosingResult();
                        updateWordIndex();
                    }
                    return;
                }, 1200);
            }
            guessedWords.push([]);
        } catch (_error) {
            window.alert("Esa palabra no está en el juego!");
        }
    }
    function deleteLetter() {
        const currentWordArray = getCurrentWordArray();
        if (!currentWordArray.length) {
            return;
        }
        currentWordArray.pop();

        guessedWords[guessedWords.length - 1] = currentWordArray;
        const lastLetterElement = document.getElementById(availableSpace - 1);
        lastLetterElement.innerHTML = "";
        availableSpace = availableSpace - 1;
    }

    function addKeyboardClicks() {
        const keys = document.querySelectorAll(".keyboard-row button");
        for (let i = 0; i < keys.length; i++) {
            keys[i].addEventListener("click", ({ target }) => {
                const key = target.getAttribute("data-key");
                if (key === "enter") {
                    submitWord();
                    return;
                }

                if (key === "del") {
                    deleteLetter();
                    return;
                }

                updateGuessedWords(key);
            });
        }
    }

    function initHelpModal() {
        const modal = document.getElementById("help-modal");


        const btn = document.getElementById("help");


        const span = document.getElementById("close-help");

        // Cuando el usuario clickea en el boton, abrir la ventana
        btn.addEventListener("click", function () {
            modal.style.display = "block";
        });

        // Cuando el usuario clickea en <span> (x), cerrar la ventana
        span.addEventListener("click", function () {
            modal.style.display = "none";
        });

        // Cuando el usuario clickea afuera de la ventana se cierra
        window.addEventListener("click", function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    }

    function initStatsModal() {
        const modal = document.getElementById("stats-modal");

        const btn = document.getElementById("stats");

        const span = document.getElementById("close-stats");


        btn.addEventListener("click", function () {

            modal.style.display = "block";
        });


        span.addEventListener("click", function () {
            modal.style.display = "none";
        });


        window.addEventListener("click", function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    }
});
