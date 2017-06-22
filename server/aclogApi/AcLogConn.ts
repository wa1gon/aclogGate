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
    private dataFullCallback: any;

    public open() {
        if (this.isConnected) return;
        if (!this.port) throw new Error("connection port is define");

        this.socket.connect(this.port, this.host, () => {
            this.isConnected = true;

        });
    }
    public listAllDatabase(count: number, callback: (err: string, results: Array<LogGateResp>) => any) {

        let list: string;
        if (count)
            list = `<CMD><LIST><INCLUDEALL><VALUE>${count}</VALUE></CMD>\r\n`;
        else
            list = '<CMD><LIST><INCLUDEALL></CMD>\r\n';

        console.log(list)
        this.dataFullCallback = callback;
        this.socket.on('data', (data: Buffer) => {
            this.numOfDataReads++;
            let rc = this.fillBuf(data);
            if (rc) {
                console.log("found end at: " + this.buffer.length)
                let qsos = this.processBuffer();
                this.buffer = "";
                this.dataFullCallback(undefined, qsos);
            }
        });

        this.numOfDataReads = 0;

        this.socket.write(list);
        this.socket.setTimeout(30000);
        this.socket.on('timeout', () => {
            console.log("in timeout: buffer length: " + this.buffer.length);
            this.buffer = "";
            this.dataFullCallback(undefined, []);
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