const Express = require("express");
const Router = Express.Router();

const DataManager = require("../modules/DataManager.js");

Router.post("/", async (req, res) => {
    let requestIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    let suspectData = req.body.suspectData;
    /* 
    {
        USER_INPUT <- check for input later
        name: String,
        age: Number,
        address: String,
        socials: {"twitter": url, "instagram": url, "youtube": url}
        description: String, (what caused them to be suspcious)
        files: [], <- additional proof if needed <- first upload file to backend server, then save url
        BACKEND_GENERATED
        dateReported: DateManager.GetFormattedDate(),
        reported_by: token
    }
    */

    let token = req.body.token;
    if (!token) return res.send({ success: false, error: "No Auth Token" });

    let data = await DataManager.GetUserData(token);
    if (!data) return res.send({ success: false, error: "Invalid Auth Token" });

    suspectData.authToken = token;
    suspectData.dateReported = DataManager.GetFormattedDate();
    let id = await DataManager.CreateSuspect(suspectData);
    data.suspects.push(id);
    await DataManager.UpdateUserData(token, data);

    res.send({ success: true, id: id, date: suspectData.dateReported });
});

module.exports = {
    path: "createsuspect",
    router: Router
}