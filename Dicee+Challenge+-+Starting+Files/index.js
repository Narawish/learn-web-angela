const imgPath = [
    "./images/dice1.png",
    "./images/dice2.png",
    "./images/dice3.png",
    "./images/dice4.png",
    "./images/dice5.png",
    "./images/dice6.png",
];

const randomNum1 = Math.floor(Math.random()*6);
const randomNum2 = Math.floor(Math.random()*6);

document.getElementsByClassName("img1")[0].setAttribute("src", imgPath[randomNum1]);
document.getElementsByClassName("img2")[0].setAttribute("src", imgPath[randomNum2]);

const title = document.getElementsByTagName("h1")[0];
if(randomNum1 > randomNum2){
    title.innerHTML = "Player 1 Wins!";
}
else if(randomNum1 < randomNum2){
    title.innerHTML = "Player 2 Wins!";
}