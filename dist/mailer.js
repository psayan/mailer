"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// nodemailer module
const nodemailer = require("nodemailer");
// custom config file
const config_1 = require("./config/config");
// express and post request body parser
const express = require("express");
const bodyParser = require("body-parser");
// instantiate express app
const app = express();
const port = 8000;
// add body-parser to express app
app.use(bodyParser.json());
// handle post request
app.post('/api/email-service/send', sendMail);
//start server
app.listen(port, () => {
    console.log("Listening at http://localhost:" + port + "/");
    console.log("Press ^C to exit.");
});
// console.log(transport);
// post request handler
function sendMail(request, response) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(config_1.transport);
    console.log("recipient is " + request.body.to);
    console.log("message is " + request.body.text);
    // mail content
    let mailOptions = {
        from: config_1.senderAddress,
        to: request.body.to,
        subject: 'Hello',
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