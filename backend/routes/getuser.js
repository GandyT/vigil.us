const Express = require("express");
const Router = Express.Router();

const DataManager = require("../modules/DataManager.js");

Router.post("/", async (req, res) => {
    let requestIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    let token = req.body.token;

    if (!token) return res.status(401).send({ success: false, error: "Missing Token" });

    let data = DataManager.GetUserData(token);
    if (!data) return res.status(401).send({ success: false, error: "Invalid Token" });

    res.status(200).send({ success: true, data: data });
});

module.exports = {
    path: "getuser",
    router: Router
}