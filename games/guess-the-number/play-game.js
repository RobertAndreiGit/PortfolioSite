let min;
let max;

async function start_game(){
    min = document.getElementById("min-nr").value;
    max = document.getElementById("max-nr").value;

    if(isNaN(min) || isNaN(max) || min==="" || max===""){
        alert("Input must be numbers");
        return;
    }

    if(Number(min) >= Number(max)){
        alert("MIN MUST BE SMALLER THAN MAX");
        return;
    }

    if(Number(min) < 0 || Number(max) < 0){
        alert("Numbers must be positive");
        return;
    }

    let vartemp = await (createRequest("POST","http://localhost:3002",`start ${min} ${max}`));

    document.getElementById("game-started").style.display = "block";
    document.getElementById("game-not-started").style.display = "none";

    let resp = await createRequest("POST","http://localhost:3002","getGuesses 0 0");

    document.getElementById("guesses-left-value").innerHTML = resp;

    document.getElementById("guess-interval").innerHTML = `${min} - ${max}`;
}

async function make_guess(){
    let guess = document.getElementById("player-guess").value;

    if(isNaN(guess) || guess===""){
        alert("Input must be a number");
        return;
    }

    if(Number(min) > Number(guess) || Number(max) < Number(guess)){
        alert("Your guess is not in the given interval");
        return;
    }

    let guess_result = await createRequest("POST","http://localhost:3002",`guess ${guess} 0`);

    let resp = await createRequest("POST","http://localhost:3002","getGuesses 0 0");
    document.getElementById("guesses-left-value").innerHTML = `${resp}`;

    if(guess_result === "wasover" || guess_result === "over"){
        alert(`Game Over! The number was ${joc.number}.`);
        alert("Now the game will restart");
        document.getElementById("game-started").style.display = "none";
        document.getElementById("game-not-started").style.display = "block";
        return;
    }

    if(guess_result === "wasguessed"){
        alert(`You already guessed the number`);
        alert("Now the game will restart");
        document.getElementById("game-started").style.display = "none";
        document.getElementById("game-not-started").style.display = "block";
        return;
    }

    if(guess_result === "bingo"){
        alert("YOU GUESSED THE NUBMER!");
        alert("Now the game will restart");
        document.getElementById("game-started").style.display = "none";
        document.getElementById("game-not-started").style.display = "block";
        return;
    }

    alert(`Your guess was ${guess_result}`);
    return;
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
