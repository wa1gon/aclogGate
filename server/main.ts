import { AcLogConn } from './aclogApi/AcLogConn';
import { LogGateResp } from './logGateModels/LogGateResp';

var express = require('express');
var bodyParser = require('body-parser');

let port = process.env.PORT || 3000;
let app = express();

app.use(bodyParser.json);

// let acConn = new AcLogConn();
// acConn.port = 1100;
// acConn.host = "192.168.1.101";
// acConn.open();
console.log("top of main");
// error example: res.status(500).send(err)
// app.route.get('/',(req, res) => {
//     res.send("welcome to loggate!");
// });


app.listen(port, () => {
    console.log("Listing on port " + port);
});
let logRouter = express.Router();
logRouter.get('/', (req, res) => {
    console.log("in get");
    res.send('Welcome to loggate');
});

app.get('/', function(req, res){
    res.send('welcome to my API!');
});


app.route("/loggate/v1")
    .get((req, res) => {
      res.send("welcome to loggate!");  
    })
    .get((req, res) => {
        console.log("in get loggate/v1");
        let responseJson = { hello: "this is my api" };
        // acConn.listAllDatabase((err: string, result: Array<LogGateResp>) => {
        //     console.log("got list all data resp")
        //     res.json(result);
        // });
    }
);
app.use('/loggate/v1', logRouter);

