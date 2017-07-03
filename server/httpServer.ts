
import { AcLogConn } from './aclogApi/AcLogConn';
import { LogGateResp } from './logGateModels/LogGateResp';

var http = require('http');
var url = require('url');
const querystring = require('querystring');

export class HttpServer {
    private readonly listAllPath = "/loggate/v1/listall";

    private httpPort: number;
    private httpHostName: string;

    constructor(p: number = 3000, h: string = "localhost") {
        this.httpPort = p;
        this.httpHostName = h;
    }

    public createServer() {
        const server = http.createServer((req, res) => {
            let q = url.parse(req.url);

            switch (q.pathname) {
                case this.listAllPath:
                    console.log("got request")    
                    let qObj = querystring.parse(q.query);

                    let count: number = Number.parseInt(qObj.count);
                    this.listDataBase(count, req, res);

            }
        });

        server.listen(this.httpPort);
    }

    private listDataBase(limit: number, req, res) {
        let acConn: AcLogConn = new AcLogConn();
        acConn.port = 1100;
        acConn.host = "192.168.1.101";
        console.log("port: %d host: %s", this.httpPort, this.httpHostName);
        acConn.listAllDatabase(limit, req, res);
    }
}




