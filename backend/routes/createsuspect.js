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
        socials: [{type: "twitter", url: ""}, {type: "instagram", url: ""}, {type: "youtube", "url"}]
        description: String, (what caused them to be suspcious)
        files: [], <- additional proof if needed
        BACKEND_GENERATED
        date_reported: DateManager.GetFormattedDate(),
        reported_by: token
    }
    */

    let token = req.body.token;
    if (!token) return res.status(401).send({ success: false, error: "No Auth Token" });

    let data = GetUserData(token);
    if (!data) return res.status(401).send({ success: false, error: "Invalid Auth Token" });

    let id = await DataManager.CreateSuspect();
    data.suspects.push(id);
    await DataManager.UpdateUserData(token, data);

    res.status(200).send({ success: true, id: id });
});

module.exports = {
    path: "createsuspect",
    router: Router
}