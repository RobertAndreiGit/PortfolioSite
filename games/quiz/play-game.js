function pg_startgame(){
    startGame(5);
}

function pg_answer(){
    let answer = document.querySelector('input[name="question-answer"]:checked').value;

    if(answer !== "A" && answer !== "B" && answer !== "C" && answer !== "D"){
        alert("Only answer with A, B, C or D!");
        return;
    }

    guess(answer);
}

function new_game(){
    endGame();
}