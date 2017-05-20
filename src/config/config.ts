'use strict';

export const transport = {
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
    //  Example
      user: "example@live.com",
      pass: "password"
    }
};

export const senderAddress: string = '"Example" <example@live.com>'; 