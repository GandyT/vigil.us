const Express = require("express");
const Router = Express.Router();

const DataManager = require("../modules/DataManager.js");

Router.get("/", async (req, res) => {
    let requestIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    let id = req.query.identifier;

    let v = await DataManager.VerifyToken(id);
    if (!v) return res.send({ success: false, error: "Invalid Identification" });

    res.send({ success: true, token: v });
});

module.exports = {
    path: "verify",
    router: Router
}