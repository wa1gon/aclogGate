import { AcLogConn } from './aclogApi/AcLogConn';

let acConn = new AcLogConn();
acConn.port = 1100;
acConn.host = "192.168.1.103";

acConn.listAllDatabase((err: string,result: string[]) => {
    
})

