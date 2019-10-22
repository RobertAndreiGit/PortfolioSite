const http = require('http');
const headers = {
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Headers':'x-requested-with, content-type',
    'Access-Control-Allow-Methods':'POST, GET, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Credentials':'true'
};
module.exports = function createServer(port, proceseazaRequest) {
    const server = http.createServer((req, res) => {
        let method = req.method;
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            let mesaj = Buffer.concat(body).toString();
            let mesajResponse = proceseazaRequest(method, mesaj);
            res.writeHead(200, headers);
            console.log(mesajResponse);
            res.end(mesajResponse);
        });
    });
    server.listen(port, () =>{
        console.log(`Server listening to: ${port}`)
    })
};