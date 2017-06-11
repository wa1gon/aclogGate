var net = require('net');
import { ParseAcLog } from './parseAcLog';
export class AcLogConn {
    public port: number;
    public host: string;
    private cli

    private readonly list : string = '<CMD><LIST><INCLUDEALL></CMD>\r\n';

    public listAllDatabase(callback: (err: string, results: string[]) => any) {
        let acPrase = new ParseAcLog();
        console.log("host: " + this.host);


        var client = new net.Socket();
        client.connect(this.port, this.host, () => {
            acPrase.buffer = "";
            console.log("before client write");
            client.write(this.list);
            console.log("after client write");
        });

        client.on('data', (data: Buffer) => {
            console.log("top of client on");
            let rc = acPrase.fillBuf(data);
            if (rc) {
                let list = acPrase.splitList();
                let i = 1;
                for (let cmd of list) {
                    i++;
                }
                acPrase.buffer = "";
            }
        });
    }

}