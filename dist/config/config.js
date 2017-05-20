"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transport = {
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        //  Example
        user: "example@live.com",
        pass: "password"
    }
};
exports.senderAddress = '"Example" <example@live.com>';
//# sourceMappingURL=config.js.map