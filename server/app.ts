import { AcLogConn } from './aclogApi/AcLogConn';
import { LogGateResp } from './logGateModels/LogGateResp';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
let logRouter = express.Router();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let acConn = new AcLogConn();
acConn.port = 1100;
acConn.host = "192.168.1.101";
acConn.open();

app.get('/', function (req, res) {
    res.send('welcome to my API!');
});

app.listen(port, function () {
    console.log('Gulp is running my app on  PORT: ' + port);
});

logRouter.get("/loggate/v1/listall",((req, res) => {
 
            acConn.listAllDatabase((err: string, result: Array<LogGateResp>) => {
            console.log("got list all data resp")
            res.json(result);
        });
    })

);
app.use('/', logRouter);