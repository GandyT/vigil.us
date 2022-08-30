const Express = require("express");
const Router = Express.Router();

const DataManager = require("../modules/DataManager.js");

// Upload first and then return name to user. then let user associate that evidence with suspect
Router.post("/", async (req, res) => {
    if (!req.files.file) return res.send({ success: false, error: "Missing Files"});

    let evidence = req.files.file;
    let fileName = `${DataManager.GenerateToken()}-${evidence.name}`;
    
    evidence.mv(`./data/files/${fileName}`);

    return res.send({ success: true, fileName: fileName })
});

module.exports = {
    path: "submitevidence",
    router: Router
}