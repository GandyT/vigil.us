const Express = require("express");
const Router = Express.Router();

const DataManager = require("../modules/DataManager.js");

Router.get("/", async (req, res) => {
    let requestIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    let id = req.query.id;
    let token = req.query.token;

    if (!id) return res.send({ success: false, error: "Missing Id" });

    let data = await DataManager.GetSuspectData(id);
    if (!data) return res.send({ success: false, error: "Invalid Suspect Id" });
    if (data.authToken != token) return res.send({ success: false, error: "Invalid Verification" });

    res.send({ success: true, d: data });
});

module.exports = {
    path: "getsuspect",
    router: Router
}