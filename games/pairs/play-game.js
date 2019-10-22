let censored_list = ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"];

async function start_game() {
    let start = await createRequest("POST","http://localhost:3001",`start none none`);

    document.getElementById("pre-game-start").style.display = "none";
    document.getElementById("post-game-start").style.display = "block";

    censored_list = ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"];
    update_list();
}

async function make_guess(){
    let first = document.getElementById("nr1").value;
    let second = document.getElementById("nr2").value;

    if(first==="" || second===""){
        alert("Input can't be empty");
        return;
    }

    if(Number(first) === Number(second)){
        alert("Numbers must be different");
        return;
    }

    if(Number(first) < 1 || Number(first) > 20 || Number(second) < 1 || Number(second) > 20){
        alert("Numbers must be between 1 and 20");
        return;
    }

    let guess_result = await createRequest("POST","http://localhost:3001",`guess ${first} ${second}`);
    guess_result = guess_result.split(",");
    if(guess_result.length === 1){
        guess_result = guess_result[0];
    }

    if(guess_result === "invalid"){
        alert("Invalid guess!");
        return;
    }

    if(guess_result[0] === guess_result[1]){
        alert("Good guess!");
        censored_list[first-1] = guess_result[0];
        censored_list[second-1] = guess_result[1];
        update_list();
        return;
    }

    alert(`You guessed ${guess_result[0]} and ${guess_result[1]}`);
}

function update_list(){
    document.getElementById("number-list").innerHTML = `[${censored_list}]`;

    if(!censored_list.includes('x')){
        alert("YOU WON, YOU FOUND ALL THE PAIRS!");
        document.getElementById("pre-game-start").style.display = "block";
        document.getElementById("post-game-start").style.display = "none";
        return;
    }
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