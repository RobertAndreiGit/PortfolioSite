module.exports = [
    {
        action: "start",
        callback: (min,max) => {
            return start(Number(min),Number(max));
        }
    },
    {
        action: "guess",
        callback: (nr,none) => {
            return guess(Number(nr),none);
        }
    },
    {
        action: "getGuesses",
        callback: (nr,nr2) => {
            return getGuesses(nr,nr2);
        }
    }
];

var joc = {
    start : start,
    guess : guess,
    wasGuessed : false,
    number : undefined,
    playerGuesses : 0
}

function getGuesses(nr, nr2) {
    return (Number(joc.maxGuesses) - Number(joc.playerGuesses)).toString();
}

function random(min,max){
    return Math.floor((Math.random()*(max-min+1)+min));
}

function start(min,max){
    joc.wasGuessed = false;
    joc.number = random(min,max);
    joc.maxGuesses = Math.ceil(Math.log(max-min) * 1.5) ;
    joc.playerGuesses = 0;

    return "ok";
}

function guess(nr,none){
    if(joc.maxGuesses < joc.playerGuesses){
        return "wasover";
    }
    if(joc.wasGuessed){
        return "wasguessed";
    }
    if(nr === joc.number){
        joc.wasGuessed = true;
        return "bingo";
    }
    if(nr > joc.number){
        joc.playerGuesses += 1;
        if(joc.maxGuesses-1 < joc.playerGuesses){
            return "over";
        }
        return "too big";
    }
    if(nr < joc.number){
        joc.playerGuesses += 1;
        if(joc.maxGuesses-1 < joc.playerGuesses){
            return "wasover";
        }
        return "too small";
    }
    console.log("WHAT THE FUCK");
}

function restart_game(){
    joc.number = undefined;
}