let convert = require("xml-js");

export class ParseAcLog {
    public static buffer: string;
    constructor() { }
    public static fillBuf(data: Buffer): boolean {
        let databuf = data.toString()
        ParseAcLog.buffer = ParseAcLog.buffer + databuf;
        if (ParseAcLog.buffer.indexOf("\r\n")) {
            console.log("found end");
            return true;
        }
        return false;
    }
    public static splitList(): Array<string> {
        var r = new RegExp(/<\/CMD>/, 'g');
        let buf = ParseAcLog.buffer.replace(r, "</CMD>\r")
        let arr = buf.split("\r");
        console.log("arr length: " + arr.length);
        let rcArray = new Array<string>();
        for (let cmd of arr) {
            rcArray.push(cmd);
        }
        return rcArray;
    }
    public static parseResp(cmd: string): any {
        let gt = cmd.indexOf(">");
        let tag = cmd.substr(1, gt - 1);
        let xml = cmd.substr(gt + 1);
        // xml = '<root>' + xml + '</root>';
        //console.log("xml: " + xml);
        this.fixCmdOptTag(xml)


        var result = convert.xml2json(xml, { compact: false, space: 4 });

    }
    public static fixCmdOptTag(xml: string): string {

        let cmd = xml.replace('<CMD><', "");
        let loc = cmd.indexOf('>');
        let rc = cmd.substr(0, loc);
        let oldstr = "<" + rc + ">";
        let newstr = "<" + rc + "/>";
        xml = xml.replace(oldstr, newstr);
        return rc;
    }
}