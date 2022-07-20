const Express = require("express");
const Router = Express.Router();

const DataManager = require("../modules/DataManager.js");

Router.post("/", async (req, res) => {
    let requestIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    let token = req.body.token;
    let updateData = req.body.data;

    if (!updateData) return res.send({ success: false, error: "Missing Data" });
    if (!token) return res.send({ success: false, error: "Missing Token" });

    let data = await DataManager.GetUserData(token);
    if (!data) return res.send({ success: false, error: "Invalid Token" });

    let validUpdate = await DataManager.UpdateSuspect(token, updateData);
    if (!validUpdate) return res.send({ success: false });

    res.send({ success: true });
});

module.exports = {
    path: "updatesuspect",
    router: Router
}