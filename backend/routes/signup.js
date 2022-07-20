const Express = require("express");
const Router = Express.Router();

const DataManager = require("../modules/DataManager.js");

const NodeMailer = require("nodemailer");

/* VARIABLES */
const EmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const EmailTransport = NodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

Router.post("/", async (req, res) => {
    let requestIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    let email = req.body.email.toLowerCase();
    if (!email) return res.send({ success: false, error: "Missing Email" });
    if (email.match(EmailRegEx) == null) return res.send({ success: false, error: "Invalid Email Address" });

    let emailExists = await DataManager.EmailExists(email);
    if (emailExists) return res.send({ success: false, error: "Email Already Exists" });

    let id = await DataManager.CreateVerifyToken(email);

    EmailTransport.sendMail({
        from: "\"vigil.us\" <noreply@vigilus.com>",
        to: email,
        subject: "Email Verification",
        html: `<p>
            <b>Please click this link to verify your email</b><br>
            <a href="${process.env.DOMAIN}/api/verify?identifier=${id[0]}">
                Verify Account
            </a> <br>
            Afterwards, sign in with the token: ${id[1]}
        </p>`
    });

    res.send({ success: true });
});

module.exports = {
    path: "signup",
    router: Router
}