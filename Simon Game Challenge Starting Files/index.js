// getting btn classes in to array
const btn = Array.from(document.getElementsByClassName("btn"));


let isGameOver = false;
let levelCounter = 1;
let sequence = [];
let pressedButton = [];

//create sound object
const sounds = {
    blue: "./sounds/blue.mp3",
    green: "./sounds/green.mp3",
    red: "./sounds/red.mp3",
    yellow: "./sounds/yellow.mp3",
    wrong: "./sounds/wrong.mp3"
}

const playSound = (element) => {
    const audio = new Audio(element);
    audio.play();
}


const keyPress = (button) => {
    const buttonColor = button.classList[1];
        setTimeout(()=>{
            button.classList.toggle("pressed");
        },250);

        pressedButton.push(buttonColor);
        playSound(sounds[buttonColor]);
        button.classList.toggle("pressed");

        console.log(pressedButton, sequence);
        checkUserInput();
    }


btn.forEach(el => {
    el.addEventListener("click", () => keyPress(el));
})


const gameSequence = () => {

    const randomNumber = Math.floor(Math.random()*4);
    sequence.push(Object.keys(sounds)[randomNumber]);

    sequence.forEach((el, idx) => {
        const btnColor = document.getElementById(el);
        setTimeout(()=>{
            playSound(sounds[el]);
            btnColor.classList.toggle("pressed");
        },500 + idx*500);
        
        setTimeout(()=>btnColor.classList.toggle("pressed"), 500 + idx*500 + 250);
    });
}

const arrayEquals = (arr1, arr2) => {
    return arr1.every((value,idx) => value === arr2[idx]);
}
const checkUserInput = () => {
    if (pressedButton.length === sequence.length){
        console.log(arrayEquals(pressedButton,sequence));
        if (arrayEquals(pressedButton,sequence)){
            setTimeout(()=>{
                levelCounter++;
                pressedButton = [];
                updateLevelTitle();
                gameSequence();
            },300);
        }
        else {
            gameOver();
        }
    }
    else {
        if (pressedButton[pressedButton.length - 1] !== sequence[pressedButton.length - 1]){
            gameOver();
        }
    }
}

const restartGame = () =>{
    isGameOver = false;
    levelCounter = 1;
    sequence = [];
    pressedButton = [];
}

const gameOver = () => {
    isGameOver = true;
    playSound(sounds.wrong);
    document.getElementById("level-title").innerHTML = "Game Over! Press a to play again.";
}

const updateLevelTitle = () => {
    document.getElementById("level-title").innerHTML = `Level ${levelCounter}`;
}



const startGame = () => {
    restartGame();
    updateLevelTitle();
    gameSequence();
}
window.addEventListener("keydown", (e)=>{
    if (e.key==='a'){
        startGame();
    }
})