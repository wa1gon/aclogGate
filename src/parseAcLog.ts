export class ParseAcLog {
    public  static buffer: string;
    constructor() {
        

    }
    public static fillBuf(data: Buffer) : boolean{
        ParseAcLog.buffer = ParseAcLog.buffer + data.toString();
        if (ParseAcLog.buffer.indexOf("\r\n")) {
            return true;
        }
        return false;
    }
    public static parseList(): Array<string> {

        let arr = ParseAcLog.buffer.split("</CMD><CMD>");
        let rcArray = new Array<string>();
        for (let cmd of arr) {
            cmd = cmd.replace("<CMD>", "");
            cmd = cmd.replace("</CMD>", "");
            rcArray.push(cmd);
        }
        return rcArray;
    }
}