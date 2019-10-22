const createServer = require("./demo-create-server.js");
createServer(3001, processRequest);

const routes = require("./routes.js");

function processRequest(method, message) {
    const messageItems = message.split(" ");
    const action = messageItems[0];
    const param = messageItems.slice(1, messageItems.length);
    const route = routes.find(route => route.action === action);

    if (route === undefined) {
        return `The method ${action} was not defined`;
    }

    return route.callback(param[0].toString(),param[1]).toString();
} 