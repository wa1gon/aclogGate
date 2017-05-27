"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let convert = require("xml-js");
class ParseAcLog {
    constructor() { }
    static fillBuf(data) {
        let databuf = data.toString();
        ParseAcLog.buffer = ParseAcLog.buffer + databuf;
        if (ParseAcLog.buffer.indexOf("\r\n")) {
            console.log("found end");
            return true;
        }
        return false;
    }
    static splitList() {
        var r = new RegExp(/<\/CMD>/, 'g');
        let buf = ParseAcLog.buffer.replace(r, "</CMD>\r");
        let arr = buf.split("\r");
        console.log("arr length: " + arr.length);
        let rcArray = new Array();
        for (let cmd of arr) {
            rcArray.push(cmd);
        }
        return rcArray;
    }
    static parseResp(cmd) {
        let gt = cmd.indexOf(">");
        let tag = cmd.substr(1, gt - 1);
        let xml = cmd.substr(gt + 1);
        this.fixCmdOptTag(xml);
        var result = convert.xml2json(xml, { compact: false, space: 4 });
    }
    static fixCmdOptTag(xml) {
        let cmd = xml.replace('<CMD><', "");
        let loc = cmd.indexOf('>');
        let rc = cmd.substr(0, loc);
        let oldstr = "<" + rc + ">";
        let newstr = "<" + rc + "/>";
        xml = xml.replace(oldstr, newstr);
        return rc;
    }
}
exports.ParseAcLog = ParseAcLog;
//# sourceMappingURL=parseAcLog.js.map