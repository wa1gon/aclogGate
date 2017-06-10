"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AcLogConn_1 = require("./aclogApi/AcLogConn");
let acConn = new AcLogConn_1.AcLogConn();
acConn.port = 1100;
acConn.host = "192.168.1.103";
acConn.listAllDatabase((err, result) => {
});
//# sourceMappingURL=main.js.map