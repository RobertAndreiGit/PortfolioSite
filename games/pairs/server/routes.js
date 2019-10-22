module.exports = [
    {
        action: "start",
        callback: (param1, param2) => {
            return game.start();
        }
    },
    {
        action: "guess",
        callback: (x,y) => {
            return game.guess(x,y);
        }
    }
];

var game = {
    start : function(){
        this.cardList = [];

        for(var i = 1; i <= 10; i++){
            this.cardList.push(i);
            this.cardList.push(i);
        }
        this.cardList.sort((a,b) => 0.5 - Math.random());
        return "ok";
    },
    guess : function(x,y){
        console.log(`${this.cardList}`);
        if(x < 1 || y < 1 || x > this.size || y > this.size
            || this.cardList[x-1] === "X" || this.cardList[y-1] === "X"){
            return "invalid";
        }
        if(this.cardList[x-1] === this.cardList[y-1]){
            let ret_res = [this.cardList[x-1],this.cardList[y-1]];
            this.cardList[x-1] = "X";
            this.cardList[y-1] = "X";
            return ret_res;
        }
        return [this.cardList[x-1],this.cardList[y-1]];
    },
    cardList : [],
    size : 20
}
