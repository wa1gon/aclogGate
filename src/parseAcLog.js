"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let convert = require("xml-js");
const qso_1 = require("./qso");
class ParseAcLog {
    constructor() { }
    fillBuf(data) {
        let databuf = data.toString();
        this.buffer = this.buffer + databuf;
        if (this.buffer.indexOf("\r\n")) {
            console.log("found end");
            return true;
        }
        return false;
    }
    splitList() {
        var r = new RegExp(/<\/CMD>/, 'g');
        let buf = this.buffer.replace(r, "</CMD>\r");
        let arr = buf.split("\r");
        console.log("arr length: " + arr.length);
        let rcArray = new Array();
        for (let cmd of arr) {
            rcArray.push(cmd);
        }
        return rcArray;
    }
    parseResp(cmd) {
        console.log("top of parseResp");
        let cmdTag = this.fixCmdOptTag(cmd);
        console.log(this.xml);
        var result = convert.xml2js(this.xml, { compact: false, space: 4 });
        let rc = this.transform(result);
        return rc;
    }
    transform(input) {
        let recType = input.elements[0].elements[0].name;
        switch (recType) {
            case 'LISTRESPONSE':
                this.transformListResponse(input);
        }
    }
    transformListResponse(input) {
        let qso = new qso_1.Qso();
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
    fixCmdOptTag(acXml) {
        let cmd = acXml.replace('<CMD><', "");
        let loc = cmd.indexOf('>');
        let rc = cmd.substr(0, loc);
        let oldstr = "<" + rc + ">";
        let newstr = "<" + rc + "/>";
        this.xml = acXml.replace(oldstr, newstr);
        return rc;
    }
}
exports.ParseAcLog = ParseAcLog;
//# sourceMappingURL=parseAcLog.js.map