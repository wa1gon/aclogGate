var net = require('net');
import { ParseAcLog } from './parseAcLog';
export class AcLogConn {
    public port: number;
    public host: string;

    private readonly list = '<CMD><LIST><INCLUDEALL></CMD>\r\n';

    public listAllDatabase(callback: (err: string, results: string[]) => any) {
        let acPrase = new ParseAcLog();


        var client = new net.Socket();
        client.connect(1100, '192.168.1.103', function () {
            acPrase.buffer = "";
            client.write(this.list);
        });
        
        client.on('data', (data: Buffer) => {
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