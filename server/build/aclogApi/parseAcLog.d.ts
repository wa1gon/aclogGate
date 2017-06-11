import { Qso } from "../logGateModels/qso";
export declare class ParseAcLog {
    xml: string;
    constructor();
    parseResp(cmd: string): any;
    transform(input: any): any;
    transformReadBMF(input: any): void;
    transformListResponse(input: any): Qso;
    fixCmdOptTag(acXml: string): string;
}
