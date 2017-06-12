import { Qso } from './qso';
import { RadioBMF } from '../aclogApi/RadioBMF';
export class LogGateResp {
    responses: Array<Qso|RadioBMF>

}