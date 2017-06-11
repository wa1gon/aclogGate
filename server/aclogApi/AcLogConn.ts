var net = require('net');
import { ParseAcLog } from "./parseAcLog";

export class AcLogConn {
    public port: number;
    public host: string;
    public buffer: string;

    private numOfDataReads: number = 0;
    private acParse = new ParseAcLog();
    private isConnected = false;
    private readonly list: string = '<CMD><LIST><INCLUDEALL></CMD>\r\n';
    private socket = new net.Socket();

    public open() {
        if (this.isConnected) return;
        if (!this.port) throw new Error("connection port is define");

        this.socket.connect(this.port, this.host, () => {
            this.isConnected = true;
        });
    }
    public listAllDatabase(callback: (err: string, results: string[]) => any) {

        const list = '<CMD><LIST><INCLUDEALL></CMD>\r\n';

        this.socket.on('data', (data: Buffer) => {
            this.numOfDataReads++;
            console.log("Data Reads: " + this.numOfDataReads)
            let rc = this.fillBuf(data);
            if (rc) {
                console.log("Ready to process buffer")
                this.processBuffer();
            }
        });
        this.buffer = "";
        this.numOfDataReads = 0;
        this.socket.write(list);
    }
    private processBuffer() {
        let qsos = this.acParse.parseResp(this.buffer);
        this.buffer = "";
    }
    public fillBuf(data: Buffer): boolean {

        let databuf = data.toString()
        this.buffer = this.buffer + databuf;
        if (this.buffer.indexOf("\r\n") === -1) 
            return false;
        
        return true;
    }
}