let convert = require("xml-js");
import { Qso } from "../logGateModels/qso";
import { RadioBMF } from "./radioBMF";


export class ParseAcLog {

    public xml: string;
    constructor() { }


    public parseResp(cmd: string): any {

        let cmdTag = this.fixCmdOptTag(cmd);
                console.log("cmdTag: " + cmdTag)
        let result = convert.xml2js(this.xml, { compact: false, space: 4 });
        let rc = this.transform(result);

        return rc;

    }
    public transform(input: any): any {
        let recType = input.elements[0].elements[0].name;

        switch (recType) {
            case 'LISTRESPONSE':
                let qso = this.transformListResponse(input);
                return qso;
            case 'READBMFRESPONSE':
                let radioInfo = this.transformReadBMF(input);
                return radioInfo;
        }
    }
    public transformReadBMF(input) {
        let radio = new RadioBMF();
        for (let elem of input.elements[0].elements) {
            if (elem.name && elem.type == 'element') {
                switch (elem.name) {
                    case 'READBMFRESPONSE':
                        radio.aclogType = elem.name;
                        break;
                    case 'BAND':
                        radio.band = elem.elements[0].text;
                        break;
                    case 'MODE':
                        radio.mode = elem.elements[0].text;
                        break;
                    case 'MODETEST':
                        radio.modeTest = elem.elements[0].text;
                        break;  
                    case "FREQ":
                        let tmpFreq = parseFloat(elem.elements[0].text);
                        if (tmpFreq != NaN) {
                            radio.freq = tmpFreq;
                        }
                        break;
                }
            }
        }
    }
    public transformListResponse(input): Qso {
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
                    case 'TIMEON':
                        qso.time_on = elem.elements[0].text;
                        break;
                    case 'BAND':
                        qso.band = elem.elements[0].text;
                        break;
                    case 'MODE':
                        qso.mode = elem.elements[0].text;
                        break;
                     case 'MODETEST':
                        qso.modeTestACLog = elem.elements[0].text;
                        break;
                    case 'CONTINENT':
                        qso.cont = elem.elements[0].text;
                        break;
                    case 'COUNTRYWORKED':
                        qso.countryWorkedACLog = elem.elements[0].text;
                        break;  
                    case 'FLDCOUNTRYDXCC':
                        qso.dxcc = elem.elements[0].text;
                        break;
                     case 'CQZONE':
                        qso.cqz = elem.elements[0].text;
                        break;
                    case 'FREQUENCY':
                        qso.freq = elem.elements[0].text;
                        break;
                    case 'ITUZ':
                        qso.ituz = elem.elements[0].text;
                        break;  
                    case 'PREFIX':
                        qso.prefixACLog = elem.elements[0].text;
                        break;  
                    case 'TIMEOFF':
                        qso.time_off = elem.elements[0].text;
                        break;
                     case 'FLDOPERATOR':
                        qso.operator = elem.elements[0].text;
                        break;
                    case 'FLDQSLR':
                        qso.qsl_rcvd = elem.elements[0].text;
                        break;
                    case 'FLDQSLS':
                        qso.qsl_sent = elem.elements[0].text;
                        break;                         
                    default:
                        //console.log("Field: " + elem.name + " Not used");    

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