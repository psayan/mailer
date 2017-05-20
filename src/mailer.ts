// nodemailer module
import * as nodemailer from "nodemailer";
// custom config file
import { transport, senderAddress } from "./config/config";
// express and post request body parser
import * as express from "express";
import * as bodyParser from "body-parser";

// instantiate express app
const app: express.Application = express();
const port: number = 8000;

// add body-parser to express app
app.use(bodyParser.json());

// handle post request
app.post('/api/email-service/send', sendMail);

//start server
app.listen(port, () => {
    console.log("Listening at http://localhost:" + port + "/");
    console.log("Press ^C to exit.")
});

// console.log(transport);

// post request handler
function sendMail(request: express.Request, response: express.Response): void {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(transport);
    console.log("recipient is " + request.body.to);
    console.log("message is " + request.body.text);

    // mail content
    let mailOptions = {
        from: senderAddress, // sender address
        to: request.body.to, // receiver
        subject: 'Hello', // Subject line
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
