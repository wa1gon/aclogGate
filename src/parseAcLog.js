"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParseAcLog {
    constructor() {
    }
    static fillBuf(data) {
        ParseAcLog.buffer = ParseAcLog.buffer + data.toString();
        if (ParseAcLog.buffer.indexOf("\r\n")) {
            return true;
        }
        return false;
    }
    static parseList() {
        let arr = ParseAcLog.buffer.split("</CMD><CMD>");
        let rcArray = new Array();
        for (let cmd of arr) {
            cmd = cmd.replace("<CMD>", "");
            cmd = cmd.replace("</CMD>", "");
            rcArray.push(cmd);
        }
        return rcArray;
    }
}
exports.ParseAcLog = ParseAcLog;
//# sourceMappingURL=parseAcLog.js.map