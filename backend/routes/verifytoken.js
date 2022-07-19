const Express = require("express");
const Router = Express.Router();

const DataManager = require("../modules/DataManager.js");

Router.post("/", async (req, res) => {
    let requestIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    let id = req.query.identifier;

    let v = DataManager.VerifyToken(id);
    if (!v) return res.status(401).send({ success: false, error: "Invalid Identification" });

    res.status(200).send({ success: true, token: v });
});

module.exports = {
    path: "verifytoken",
    router: Router
}