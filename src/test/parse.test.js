"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseAcLog_1 = require("../aclogApi/parseAcLog");
var assert = require('assert');
var parse = require('../parseAcLog');
var should = require('chai').should();
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
        let qso = parse.parseResp(cmd);
        should.exist(qso);
    });
    it('should read call sign of KE4BZJ', function () {
        let parse = new parseAcLog_1.ParseAcLog();
        let qso = parse.parseResp(cmd);
        qso.call.should.equal("KE4BZJ");
    });
    it('should read qso date of 2016/02/25', function () {
        let parse = new parseAcLog_1.ParseAcLog();
        let qso = parse.parseResp(cmd);
        qso.qso_date.toString().should.equal(new Date("2016/02/25").toString());
    });
    it('should read qso timeon of 16:10 ', function () {
        let parse = new parseAcLog_1.ParseAcLog();
        let qso = parse.parseResp(cmd);
        qso.time_on.should.equal("16:17");
    });
});
describe("fixCmdOptTag", function () {
    it('should create a json object', function () {
        let parse = new parseAcLog_1.ParseAcLog();
        let cmdOpt = parse.fixCmdOptTag(cmd);
        cmdOpt.should.equal('LISTRESPONSE');
    });
});
//# sourceMappingURL=parse.test.js.map