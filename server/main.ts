import { AcLogConn } from './aclogApi/AcLogConn';
var express = require('express');
let port = process.env.PORT || 3000;
let app = express();

let acConn = new AcLogConn();
acConn.port = 1100;
acConn.host = "192.168.1.101";
console.log("top of main");

app.get('/',(req, res) => {
    res.send("welcome to loggate!");
});
let logRouter = express.Router();

app.listen(port, () => {
    console.log("Listing on port " + port);
});
app.route("/loggate/v1")
    .get((req, res) => {
        let responseJson = { hello: "this is my api" };
        res.json(responseJson);
    });

acConn.listAllDatabase((err: string, result: string[]) => {
    
});

