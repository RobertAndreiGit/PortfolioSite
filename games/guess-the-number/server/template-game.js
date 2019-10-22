const createServer = require("./template-create-server.js");
createServer(3002, processRequest);

const routes = require("./routes.js");

function processRequest(method, message) {
    const messageItems = message.split(" ");
    const action = messageItems[0];
    const param = messageItems.slice(1, messageItems.length);
    const route = routes.find(route => route.action === action);

    let result = route.callback(param[0].toString(),param[1]);
    console.log("Result: ", result);
    console.log(messageItems);
    return result.toString();
} 