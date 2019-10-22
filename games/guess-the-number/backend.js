var joc = {
    start : start,
    guess : guess,
    wasGuessed : false,
    number : undefined,
    playerGuesses : 0
}

function random(min,max){
    return Math.floor((Math.random()*(max-min+1)+min));
}

function start(min,max){
    this.wasGuessed = false;
    this.number = random(min,max);
    this.maxGuesses = Math.ceil(Math.log(max-min) * 1.5) ;
    this.playerGuesses = 0;

    return "ok";
}

function guess(nr){
    if(this.maxGuesses < this.playerGuesses){
        return "wasover";
    }
    if(this.wasGuessed){
        return "wasguessed";
    }
    if(nr === this.number){
        this.wasGuessed = true;
        return "bingo";
    }
    if(nr > this.number){
        this.playerGuesses += 1;
        if(this.maxGuesses-1 < this.playerGuesses){
            return "over";
        }
        return "too big";
    }
    if(nr < this.number){
        this.playerGuesses += 1;
        if(this.maxGuesses-1 < this.playerGuesses){
            return "wasover";
        }
        return "too small";
    }
}

function restart_game(){
    this.number = undefined;
}