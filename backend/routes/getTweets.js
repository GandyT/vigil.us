const Express = require("express");
const Router = Express.Router();
const getTweets = require("../modules/getTweets.js");

Router.get("/", async (req, res) => {
    let username = req.query.identifier;

    if (!username) return res.send({ success: false, error: "Missing Username" })

    let tweets = await getTweets(username);
    return res.send({ success: true, tweets: tweets })
});

module.exports = {
    path: "gettweets",
    router: Router
}