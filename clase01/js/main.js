document.addEventListener("DOMContentLoaded", () => {

    let currentWordIndex = 0;
    let guessedWordCount = 0;
    let availableSpace = 1;
    let guessedWords = [[]];
    const words = ["zorro", "felpa", "pulpo", "cosas", "dorso"];
    let currentWord = words[currentWordIndex];

    initLocalStorage();
    initHelpModal();
    initStatsModal();
    createSquares();
    addKeyboardClicks();
    loadLocalStorage();



    function initLocalStorage() {
        const storedCurrentWordIndex = window.localStorage.getItem("currentWordIndex");
        if (!storedCurrentWordIndex) {
            window.localStorage.setItem("currentWordIndex", currentWordIndex);
        } else {
            currentWordIndex = Number(storedCurrentWordIndex);
            currentWord = words[currentWordIndex];
        }
    }

    function loadLocalStorage() {
        currentWordIndex = Number(window.localStorage.getItem("currentWordIndex")) || currentWordIndex
        guessedWordCount = Number(window.localStorage.getItem("guessedWordCount")) || guessedWordCount
        availableSpace = Number(window.localStorage.getItem("availableSpace")) || availableSpace
        guessedWords = JSON.parse(window.localStorage.getItem("guessedWords")) || guessedWords

        currentWord = words[currentWordIndex]

        const storedBoardContainer = window.localStorage.getItem("boardContainer");
        if (storedBoardContainer){
        document.getElementById("board-container").innerHTML = storedBoardContainer;
        }
        
        const storedKeyboardContainer = window.localStorage.getItem("keyboardContainer");
        if (storedKeyboardContainer){
        document.getElementById("keyboard-container").innerHTML = storedKeyboardContainer;

        addKeyboardClicks();
        }
    }


    function resetGame(){
        window.localStorage.removeItem("guessedWordCount")
        window.localStorage.removeItem("guessedWords")
        window.localStorage.removeItem("keyboardContainer")
        window.localStorage.removeItem("boardContainer")
        window.localStorage.removeItem("availableSpace")
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

    function preserveGameState() {
        window.localStorage.setItem("guessedWords", JSON.stringify(guessedWords));

        const keyboardContainer = document.getElementById("keyboard-container");
        window.localStorage.setItem("keyboardContainer", keyboardContainer.innerHTML);

        const boardContainer = document.getElementById("board-container");
        window.localStorage.setItem("boardContainer", boardContainer.innerHTML)
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

    function updateTotalGames() {
        const totalGames = window.localStorage.getItem("totalGames") || 0
        window.localStorage.setItem("totalGames", Number(totalGames) + 1);
    }

    function showResult() {
        const finalResultEl = document.getElementById("final-score");
        finalResultEl.textContent = "Wordle 1 - Acertaste!";

        const totalWins = window.localStorage.getItem("totalWins") || 0
        window.localStorage.setItem("totalWins", Number(totalWins) + 1);

        const currentStreak = window.localStorage.getItem("currentStreak") || 0
        window.localStorage.setItem("currentStreak", Number(currentStreak) + 1);
    }

    function showLosingResult() {
        const finalResultEl = document.getElementById("final-score");
        finalResultEl.textContent = `Wordle 1 - No la pudiste adivinar!`;

        window.localStorage.setItem("currentStreak", 0);
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

    function updateWordIndex() {
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

            localStorage.setItem("availableSpace", availableSpace);

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
                    
                    if (index === 4){
                        preserveGameState();
                    }

                }, index * interval);
            });

            guessedWordCount += 1;
            window.localStorage.setItem("guessedWordCount", guessedWordCount);

            if (guessedWord === currentWord) {
                setTimeout(() => {
                    const okSelected = Swal.fire(
                        'Bien ahí!',
                        'Adivinaste la palabra!',
                        'success'
                    );
                    if (okSelected) {
                        clearBoard();
                        showResult();
                        updateWordIndex();
                        updateTotalGames();
                        resetGame();
                    }
                    return;
                }, 1200);
            }

            if (guessedWords.length === 6 && guessedWord !== currentWord) {
                setTimeout(() => {
                    const okSelected = Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `Te quedaste sin mas intentos, la palabra era: "${currentWord.toUpperCase()}".`
                    })


                    if (okSelected) {
                        clearBoard();
                        showLosingResult();
                        updateWordIndex();
                        updateTotalGames();
                        resetGame();
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

    function updateStatsModal() {
        const currentStreak = window.localStorage.getItem("currentStreak")
        const totalWins = window.localStorage.getItem("totalWins")
        const totalGames = window.localStorage.getItem("totalGames")

        document.getElementById('total-played').textContent = totalGames
        document.getElementById('total-wins').textContent = totalWins
        document.getElementById('current-streak').textContent = currentStreak

        const winPct = Math.round((totalWins / totalGames) * 100) || 0;
        document.getElementById('win-pct').textContent = winPct
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
            updateStatsModal();
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
