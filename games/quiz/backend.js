let questionList;
let currentQ = 0;
let x = false;
var correct = 0;
function startGame(noOfQustions){
    currentQ = 0;
    questionList = [];

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/start');
    xhr.onload = function(){
        var response = xhr.responseText;
        if(isJson(response.toString()) === false){
            console.log(response.toString());
            return;
        }
        questionList = JSON.parse(response);
        document.getElementById("pre-game-start").style.display = "none";
        document.getElementById("post-game-start").style.display = "block";

        document.getElementById("game-over").style.display = "none";
        document.getElementById("final-score").style.display = "none";
        document.getElementById("please-start").style.display = "none";
        document.getElementById("new-game").style.display = "none";


        document.getElementById("answer-form").style.display = "block";

        console.log(response.toString());
        showNextQuestion();
    }
    xhr.send(noOfQustions);
}

function endGame(){
    questionList = [];
    currentQ = 0;
    x = false;
    correct = 0;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/gameover');
    xhr.onload = function(){
        var response = xhr.responseText;
        document.getElementById("pre-game-start").style.display = "block";
        document.getElementById("post-game-start").style.display = "none";
    }
    xhr.send();
}

function guess(answer){
    if(x === false){
        alert("Game not currently active. Please start a new game if you want to play again.");
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/answer');
    xhr.onload = function(){
        var response = xhr.responseText;
        console.log(response.toString());
        if(response.toString() === "Correct!"){
            correct += 1;
            alert("Correct!");
        }
        else{
            alert("Wrong answer!");
        }
        showNextQuestion();
    }
    xhr.send(questionList[currentQ-1].questionNo + " " + answer);
}

function showNextQuestion(){
    clearInterval(x);
    x = false;

    if(currentQ == questionList.length){
        console.log("Game Over!");
        console.log("Final score: " + correct + " out of " + currentQ);
        console.log("Please start a new game if you want to play again.");

        document.getElementById("game-over").style.display = "block";
        document.getElementById("final-score").style.display = "block";
        document.getElementById("final-score").innerHTML = "Final score: " + correct + " out of " + currentQ;
        document.getElementById("please-start").style.display = "block";
        document.getElementById("new-game").style.display = "block";

        document.getElementById("current-question").style.display = "none";
        document.getElementById("answer-form").style.display = "none";
        document.getElementById("timer").style.display = "none";
        return;
    }
    alert("Next Question!");

    document.getElementById("current-question").innerHTML = `${questionList[currentQ].question} <br> ${questionList[currentQ].answers}`;
    document.getElementById("current-question").style.display = "block";


    currentQ += 1;
    startCountdown(11);
}

function startCountdown(seconds){
    x = setInterval(() => {
        document.getElementById("timer").style.display = "block";
        document.getElementById("timer").innerHTML = (seconds-1).toString();
        seconds -= 1;
        if(seconds <= 0){
            alert("TIME OVER!");
            clearInterval(x);
            x = false;
            showNextQuestion();
        }
    },1000);
    return "Timer started!";
};

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function createRequest(method, url, data) {
    return new Promise(function (resolve,reject){
        const xhttp = new XMLHttpRequest();

        xhttp.open(method, url);
        xhttp.onload = () => {
            resolve(xhttp.responseText);
        };
        xhttp.send(data);
    });
}