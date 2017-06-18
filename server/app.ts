var express = require('express');
var bodyParser = require('body-parser');

var app = express();
let logRouter = express.Router();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// bookRouter = require('./Routes/bookRoutes')(Book);


// app.use('/api/books', bookRouter); 


app.get('/', function (req, res) {
    res.send('welcome to my API!');
});

app.listen(port, function () {
    console.log('Gulp is running my app on  PORT: ' + port);
});

logRouter.get("/loggate/v1",((req, res) => {
      res.send("welcome to loggate!");  
    })

);
app.use('/', logRouter);