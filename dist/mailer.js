'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const config_1 = require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8000;
app.use(bodyParser.json());
app.post('/api/email-service/send', sendMail);
app.listen(port, () => {
    console.log("Listening at http://localhost:" + port + "/");
    console.log("Press ^C to exit.");
});
// console.log(transport);
function sendMail(request, response) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(config_1.transport);
    console.log("recipient is " + request.body.to);
    console.log("message is " + request.body.text);
    let mailOptions = {
        from: '"Sayan Pal" <isayanpal@live.com>',
        to: request.body.to,
        subject: 'Hello ✔',
        text: request.body.text // plain text body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            transporter.close();
            console.log(error);
            response.status(400);
            response.send("Failed");
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        transporter.close();
        response.status(200);
        response.send("message sent");
    });
}
//# sourceMappingURL=mailer.js.map