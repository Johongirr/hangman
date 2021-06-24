const wordBox = document.querySelector('.game__current-word-box');
const guessWordBtns = document.querySelectorAll('.game-buttons__btn');
const livesLeftText = document.querySelector('.lives__text');
const hearts = document.querySelectorAll('.lives__heart');
const gameOverContainer = document.querySelector('.game-over');
const mainMenu = document.querySelector('.intro');
const hangmanImages = document.querySelectorAll('.hangman__image');
const gameContainer = document.querySelector('.game');
const instructionsContainer = document.querySelector('.instructions');

// words to be returned randomly
const randomWords = ["apple", "banana", "word", "english", "javascipt", "computer", "phone", "amazing", "good", "terrible", "crazy", "selfish", "moody", "japanese", "python", "programming", "object", "height", "short", "boring"];

// img index that incremented each time guessed wrong
let currImgIndex = 0;

// lives counter each time guess is wrong 1 live subtracted until 0
let livesCounter = 7;

// function in each call generates and returns the random word
function getRandomWord(){
    return randomWords[Math.floor(Math.random() * randomWords.length)];
}

// variable for storing random word  
let randomWord = getRandomWord();

function updateRandomText(word){
    wordBox.innerHTML = "";
    for(let i = 0; i < word.length; i++){
        const span = document.createElement('span');
        span.classList.add('game__current-letter');
        span.textContent = "_";
        wordBox.appendChild(span);
    }
}
updateRandomText(randomWord);

function removeMainMenu(){
    mainMenu.style.display = "none";
}
function removeGameOverContainer(){
    gameOverContainer.style.display = "none";
}
function removeInstructionsContainer(){
    instructionsContainer.style.display = "none";
}
function removeGameContainer(){
    gameContainer.style.display = "none";
}
 
function removeClassFromHangmanImages(){
    hangmanImages.forEach(img => img.classList.remove("hangman__img--active"));
}
function removeClassFromHearts(){
    hearts.forEach(heart => heart.classList.remove('lives__heart--off'));
}
function updateLivesLeftText(){
    livesLeftText.textContent = `You have 7 lives`;
}
function showMainMenu(){
    mainMenu.style.display = "block";
}
function showGameOverContainer(){
    gameOverContainer.style.display = "block";
}
function addEventToMainMenuBtn(){
    const gameOverMainMenuBtn = gameOverContainer.querySelector('.game-over__btn');
    gameOverMainMenuBtn.addEventListener('click', goToMainMenu);
}
function displayCorrectWord(correctWord){
    const gameOverResultText = gameOverContainer.querySelector('.game-over__correct-word');
    gameOverResultText.textContent = `The correct word is "${correctWord}"`;
}
function addInactiveClassToBtn(button){
    button.classList.add('game-buttons__btn--inactive');
}
function removeClassesFromGuessBtns(){
    guessWordBtns.forEach(btn =>{
        btn.classList.remove('game-buttons__btn--inactive');
    })
}
function disableActiveBtn(){
    guessWordBtns.forEach(btn =>{
        if(btn.classList.contains('game-buttons__btn--inactive')){
            btn.disabled = true;
        }
    })
}
function enableAllBtns(){
    guessWordBtns.forEach(btn =>{
        btn.disabled = false;
    })
}
function startNewGame(){
    removeMainMenu()
    removeGameOverContainer();
    removeInstructionsContainer();
    removeClassFromHangmanImages();
    removeClassFromHearts();
    updateLivesLeftText();
    removeClassesFromGuessBtns();
    enableAllBtns();
    gameContainer.style.display = "block";
    livesCounter = 7;
    currImgIndex = 0;
    randomWord = getRandomWord();
    updateRandomText(randomWord);
    
}
function displayMainMenu(){
    showMainMenu();
    removeInstructionsContainer();
}

function displayInstruction(){
    removeMainMenu()
    removeGameOverContainer
    instructionsContainer.style.display = "block";

    const mainMenuBtn = document.querySelector('.instructions__btn');
    mainMenuBtn.addEventListener('click', displayMainMenu);

}

function goToMainMenu(){
    const newGameBtn = document.querySelector('.new-game__btn');
    const howToPlayBtn = document.querySelector('.how-to-play__btn');
    showMainMenu();
    removeGameOverContainer
    newGameBtn.addEventListener('click', startNewGame);
    howToPlayBtn.addEventListener('click', displayInstruction);

}
function getLetters(){
    return wordBox.querySelectorAll('.game__current-letter'); 
}

function checkWordMatch(livesLeft, correctWord){  
    const gameOverGameResult = gameOverContainer.querySelector('.game-over__game-result');
    const letters = Array.from(getLetters());
    let match = ''
    for(let letter of letters){
        match += letter.textContent.trim();
    }
    if(livesLeft === 0){
        removeGameContainer();
        showGameOverContainer();
        gameOverGameResult.textContent = "You LOST!";
        displayCorrectWord(correctWord);
        addEventToMainMenuBtn();
    } else if(match === randomWord){
        removeGameContainer()
        showGameOverContainer();
        gameOverGameResult.textContent = "You WON!";
        displayCorrectWord(correctWord);
        addEventToMainMenuBtn();
    }
}

function checkLives(livesLeft, correctWord){
    if(livesLeft === 0){
        checkWordMatch(livesLeft, correctWord);
    }
    livesLeftText.textContent = livesLeft === 1 ? `You have ${livesLeft} live:` : `You have ${livesLeft} lives:`;
    hearts[livesLeft].classList.add('lives__heart--off');
    removeClassFromHangmanImages();
    hangmanImages[currImgIndex].classList.add("hangman__img--active");
    currImgIndex++;
}

function guessTheWord(e){
    console.log(e, arguments)
    const letters = getLetters();   
    for(let i = 0; i < randomWord.length; i++){
        const currentRandomWordLetter = randomWord[i].toLowerCase();
        const currentInput = this.textContent.trim().toLowerCase();
        const currentLetter = letters[i].textContent.trim();
        if(currentRandomWordLetter === currentInput && currentLetter.includes("_")){
            letters[i].textContent = currentInput;
            addInactiveClassToBtn(this);
            disableActiveBtn();
            checkWordMatch(livesCounter, randomWord);
        } else if(!randomWord.includes(currentInput) || currentLetter.includes(currentInput)){
            livesCounter--;
            addInactiveClassToBtn(this);
            disableActiveBtn();
            checkLives(livesCounter, randomWord);
            checkWordMatch(livesCounter, randomWord);
            break;
        } 
    }
    console.log(randomWord);
}
guessWordBtns.forEach(btn => btn.addEventListener('click', guessTheWord));



