var net = require('net');
import { ParseAcLog } from './parseAcLog';
export class AcLogConn {
    public port: number;
    public host: string;
    

    private readonly list : string = '<CMD><LIST><INCLUDEALL></CMD>\r\n';

    private clientConn: any = undefined;
    
    public open(port: number, host: string) {

    }
    public listAllDatabase(callback: (err: string, results: string[]) => any) {
        let acPrase = new ParseAcLog();
        var clientSocket = new net.Socket();
        this.clientConn = clientSocket.connect(this.port, this.host, () => {
            acPrase.buffer = "";
            //client.write(this.list);

        });

        clientSocket.on('data', (data: Buffer) => {
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