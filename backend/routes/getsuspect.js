const Express = require("express");
const Router = Express.Router();

const DataManager = require("../modules/DataManager.js");

Router.get("/", async (req, res) => {
    let requestIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    let id = req.query.id;

    if (!id) return res.status(401).send({ success: false, error: "Missing Id" });

    let data = DataManager.GetSuspectData(id);
    if (!data) return res.status(401).send({ success: false, error: "Invalid Suspect Id" });

    res.status(200).send({ success: true, data: data });
});

module.exports = {
    path: "getsuspect",
    router: Router
}