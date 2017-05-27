"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseAcLog_1 = require("../parseAcLog");
var assert = require('assert');
var parse = require('../parseAcLog');
var mocha = require('should');
var cmd = '<CMD><LISTRESPONSE><CALL>KE4BZJ</CALL><DATE>2016/02/25</DATE>' +
    '<TIMEON>16:17</TIMEON><BAND>20</BAND><MODE>SSB</MODE><MODETEST>PH</MODETEST>' +
    '<CONTINENT>NA</CONTINENT><COUNTRYWORKED>USA</COUNTRYWORKED>' +
    '<FLDCOUNTRYDXCC>291</FLDCOUNTRYDXCC><CQZONE>05</CQZONE>' +
    '<FREQUENCY>14.24400</FREQUENCY><ITUZ>08</ITUZ><PREFIX>KE4</PREFIX><SPCNUM>USA</SPCNUM>' +
    '<TIMEOFF>16:17</TIMEOFF><FLDINITIALS>DPW</FLDINITIALS>' +
    '<FLDOPERATOR>WA1GON</FLDOPERATOR><FLDQSLR>N</FLDQSLR><FLDQSLS>N</FLDQSLS>' +
    '<FLDSTATION>DAX</FLDSTATION><FLDPRIMARYKEY>1</FLDPRIMARYKEY></CMD>';
describe("parseResp", function () {
    it('should create a json object', function () {
        let parse = new parseAcLog_1.ParseAcLog();
        let cmdOpt = parse.fixCmdOptTag(cmd);
        cmdOpt.should.equal('LISTRESPONSE');
        let json = parse.parseResp(cmd);
        console.log(json);
        should.exist(json);
    });
});
//# sourceMappingURL=parse.test.js.map