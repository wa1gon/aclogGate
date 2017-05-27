let convert = require("xml-js");
import { Qso } from "./qso";


export class ParseAcLog {
    public buffer: string;
    public xml: string;
    constructor() { }
    public fillBuf(data: Buffer): boolean {
        let databuf = data.toString()
        this.buffer = this.buffer + databuf;
        if (this.buffer.indexOf("\r\n")) {
            console.log("found end");
            return true;
        }
        return false;
    }
    public splitList(): Array<string> {
        var r = new RegExp(/<\/CMD>/, 'g');
        let buf = this.buffer.replace(r, "</CMD>\r")
        let arr = buf.split("\r");
        console.log("arr length: " + arr.length);
        let rcArray = new Array<string>();
        for (let cmd of arr) {
            rcArray.push(cmd);
        }
        return rcArray;
    }
    public parseResp(cmd: string): any {
        // cmd = cmd.replace("<CMD>", "");
        // cmd = cmd.replace("</CMD>", "");
        console.log("top of parseResp");
        let cmdTag = this.fixCmdOptTag(cmd);
        console.log(this.xml);
        var result = convert.xml2js(this.xml, { compact: false, space: 4 });

        let rc = this.transform(result);        

        return rc;

    }
    public transform(input: any): any {
        let recType = input.elements[0].elements[0].name;
        switch (recType) {
            case 'LISTRESPONSE':
                this.transformListResponse(input);    
        }
    }
    public transformListResponse(input) : Qso {
        let qso = new Qso();
        for (let elem of input.elements[0].elements) {
            if (elem.name && elem.type == 'element') {
                switch (elem.name) {
                    case 'LISTRESPONSE':
                        qso.aclogType = elem.name;
                        break;
                    case 'CALL':
                        qso.call = elem.elements[0].text;
                        break;
                    case 'DATE':
                        qso.qso_date = new Date(elem.elements[0].text);
                        break;
                    default: 
                        
                }
            }
        }

        return qso;
    }
    public fixCmdOptTag(acXml: string): string {

        let cmd = acXml.replace('<CMD><', "");
        let loc = cmd.indexOf('>');
        let rc = cmd.substr(0, loc);
        let oldstr = "<" + rc + ">";
        let newstr = "<" + rc + "/>";
        this.xml = acXml.replace(oldstr, newstr);
        return rc;
    }
}