const Express = require("express");
const Router = Express.Router();

const DataManager = require("../modules/DataManager.js");

Router.post("/", async (req, res) => {
    let requestIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    let id = req.body.id;
    let token = req.body.token;

    if (!id) return res.send({ success: false, error: "Missing Id" });
    if (!token) return res.send({ success: false, error: "Missing Token"})

    let data = await DataManager.GetSuspectData(id);
    if (!data) return res.send({ success: false, error: "Invalid Suspect Id" });
    if (data.authToken != token) return res.send({ success: false, error: "Invalid Verification" });

    await DataManager.DeleteSuspect(id);

    return res.send({ success: true });
});

module.exports = {
    path: "deletesuspect",
    router: Router
}