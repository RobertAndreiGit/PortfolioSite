const http = require('http');
const port = 3000;
let newGameStarted = false;
let currentQuestionList = [];
let questionList = [
    {
        questionNo: 1,
        question: "Al cui caine este Scooby Doo?",
        answers: "A) Freddie B) Shaggy C) Daphne D) Velma",
        correct: "B"
    },
    {
        questionNo: 2,
        question: "Ale cui erau caprele de la care Nica a luat raie?",
        answers: "A) Smarandei B) Matusei Marioara C) Irinucai D) Isabelei",
        correct: "C"
    },
    {
        questionNo: 3,
        question: "Amnezia este pierderea...",
        answers: "A) poftei de mancare B) auzului C) vederii D) memoriei",
        correct: "D"
    },
    {
        questionNo: 4,
        question: "Aproximativ in ce procent se gaseste Oxigenul in aer?",
        answers: "A) 21 procente B) 15 procente C) 16 procente D) 75 procente",
        correct: "A"
    },
    {
        questionNo: 5,
        question: "Cand a avut loc revolutia in urma careia a fost inlaturat Nicolae Ceausescu?",
        answers: "A) decembrie 1990 B) decembrie 1989 C) decembrie 1991 D) decembrie 1988",
        correct: "B"
    },
    {
        questionNo: 6,
        question: "Care a fost a treia proba pe care Aleodor imparat a trebui sa o treaca pentru fata lui Verde Imparat?",
        answers: "A) sa separe graul de orz B) sa aduca capul omului Span C) sa se ascunda de ea D) sa o gaseasca",
        correct: "C"
    },
    {
        questionNo: 7,
        question: "Care a fost numele initial al lui Muhammad Ali inainte sa treaca la islamism?",
        answers: "A) Cassius Clay B) Muhammad John C) Sam Longford D) Joe Louis",
        correct: "A"
    },
    {
        questionNo: 8,
        question: "Care a fost capitala Imperiului Bizantin ?",
        answers: "A) Roma B) Ierusalim C) Atena D) Constantinopol",
        correct: "D"
    },
    {
        questionNo: 9,
        question: "Care a fost prima persoana care a pasit pe luna?",
        answers: "A) Yuri Gagarin B) Neil Armstrong C) Edward H. White D) niciuna",
        correct: "B"
    }
];

const server = http.createServer((req,res) =>{
    const headers = {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'x-requested-with, content-type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTION, DELETE, PUT'
    };

    if(req.method === 'POST' && req.url === '/start'){
        let body = [];
        req.on('data',(chunk) => {
            body.push(chunk);
        }).on('end', () =>{
            body = Buffer.concat(body).toString();
            res.writeHead(200,headers);

            if(Number(body) > questionList.length){
                res.end("Not enough available questions. Try a lower number.");
                return;
            }
            initGame(Number(body));
            console.log(currentQuestionList);
            res.end(JSON.stringify(currentQuestionList));
        });
    }
    if(req.method === 'POST' && req.url === '/answer'){
        let body = [];
        req.on('data',(chunk) => {
            body.push(chunk);
        }).on('end', () =>{
            body = Buffer.concat(body).toString().split(" ");
            res.writeHead(200,headers);
            res.end(guess(Number(body[0]), body[1]));
        });
    }
    if(req.method === 'GET' && req.url === '/gameover'){
        newGameStarted = false;
        currentQuestionList = [];

        res.writeHead(200,headers);
        res.end("Game Ended");
    }
});

server.listen(port,() => {
    console.log(`Server running at: ${port}`);
});

function initGame(n){
    console.log(n);
    if(newGameStarted === true){
        return "Game already started!";
    }

    newGameStarted = true;
    const shuffled = questionList.sort(() => 0.5 - Math.random());
    currentQuestionList = shuffled.slice(0, n);

    return "Game started";
}

function guess(qNumber, answer){
    console.log(currentQuestionList);
    let response = "Invalid question number";
    currentQuestionList.forEach(x => {
        if(x.questionNo === qNumber){
            if(x.correct === answer){
                response = 'Correct!';
            }
            else {
                response = "Wrong!";
            }
        }
    });
    return response;
}
