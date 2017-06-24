var net = require('net');
import { ParseAcLog } from "./parseAcLog";
import { LogGateResp } from '../logGateModels/LogGateResp';

export class AcLogConn {
    public port: number;
    public host: string;
    public buffer: string = "";

    private numOfDataReads: number = 0;
    private acParse = new ParseAcLog();
    private isConnected = false;
    //private readonly list: string = '<CMD><LIST><INCLUDEALL></CMD>\r\n';
    private socket = new net.Socket();


    public open() {
        if (this.isConnected) return;
        if (!this.port) throw new Error("connection port is define");

        this.socket.connect(this.port, this.host, () => {
            this.isConnected = true;

        });
    }
<<<<<<< Updated upstream
    public listAllDatabase(count: number, callback: (err: string, results: Array<LogGateResp>) => any) {
=======
    public listAllDatabase(count: number, listAllDatabaseCB: (err: string, results: Array<LogGateResp>) => any) {
>>>>>>> Stashed changes

        let list: string;
        if (count)
            list = `<CMD><LIST><INCLUDEALL><VALUE>${count}</VALUE></CMD>\r\n`;
        else
            list = '<CMD><LIST><INCLUDEALL></CMD>\r\n';

        console.log(list)

        this.socket.on('data', (data: Buffer) => {
            this.numOfDataReads++;
            let rc = this.fillBuf(data);
            if (rc) {
<<<<<<< Updated upstream
                console.log("found end at: " + this.buffer.length)
                let qsos = this.processBuffer();
                this.buffer = "";
                this.dataFullCallback(undefined, qsos);
=======
                console.log("found end at: " + this.buffer.length);
                let qsos = this.processBuffer();
                this.buffer = "";
                listAllDatabaseCB(undefined, qsos);
>>>>>>> Stashed changes
            }
        });

        this.numOfDataReads = 0;

        this.socket.write(list);
        this.socket.setTimeout(30000);
        this.socket.on('timeout', () => {
            console.log("in timeout: buffer length: " + this.buffer.length);
            this.buffer = "";
<<<<<<< Updated upstream
            this.dataFullCallback(undefined, []);
=======
            listAllDatabaseCB(undefined, qsos);
>>>>>>> Stashed changes
        });
    }
    private processBuffer(): Array<LogGateResp> {
        let qsos = this.acParse.parseResp(this.buffer);
        this.buffer = "";
        return qsos;
    }
    public fillBuf(data: Buffer): boolean {

        let databuf = data.toString()
        this.buffer = this.buffer + databuf;
        if (this.buffer.indexOf("\r\n") === -1)
            return false;

        return true;
    }
}