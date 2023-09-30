const wordText = document.querySelector(".word"),
    hintText = document.querySelector(".hint span"),
    timeText = document.querySelector(".time b"),
    inputField = document.querySelector("input"),
    refreshBtn = document.querySelector(".refresh-word"),
    checkBtn = document.querySelector(".check-word"),
    timerDisplay = document.getElementById("timer"); // Reference to the timer element

let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            updateTimerDisplay(maxTime); // Update the timer display
        } else {
            clearInterval(timer); // Stop the timer when time is up
            alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
            initGame();
        }
    }, 1000);
}

// Function to update the timer display with the remaining time
const updateTimerDisplay = remainingTime => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timerDisplay.innerText = formattedTime;
}

const initGame = () => {
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);

    // Start the timer with the new word
    initTimer(30);
}

const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    if (!userWord) return alert("Please enter the word to check!");
    if (userWord !== correctWord) return alert(`Oops! ${userWord} is not a correct word`);
    clearInterval(timer); // Stop the timer when the word is solved
    alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
    initGame();
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);

// Initial game setup
initGame();
