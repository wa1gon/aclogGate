import { AcLogConn } from './aclogApi/AcLogConn';
import { LogGateResp } from './logGateModels/LogGateResp';

var express = require('express');
var bodyParser = require('body-parser');
let port = process.env.PORT || 3000;
let app = express();

app.use(bodyParser.json);

let acConn = new AcLogConn();
acConn.port = 1100;
acConn.host = "192.168.1.101";
acConn.open();
console.log("top of main");
// error example: res.status(500).send(err)
app.get('/',(req, res) => {
    res.send("welcome to loggate!");
});
//let logRouter = express.Router();

app.listen(port, () => {
    console.log("Listing on port " + port);
});
app.route("/loggate/v1")
    .get((req, res) => {
        console.log("in get loggate/v1");
        let responseJson = { hello: "this is my api" };
        acConn.listAllDatabase((err: string, result: Array<LogGateResp>) => {
            console.log("got list all data resp")
            res.json(result);
        });
    }
);

