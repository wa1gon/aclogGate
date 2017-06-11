/// <reference types="node" />
export declare class AcLogConn {
    port: number;
    host: string;
    buffer: string;
    private acParse;
    private isConnected;
    private readonly list;
    private socket;
    open(): void;
    listAllDatabase(callback: (err: string, results: string[]) => any): void;
    private processBuffer();
    fillBuf(data: Buffer): boolean;
}
