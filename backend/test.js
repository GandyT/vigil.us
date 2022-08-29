
const getTweets = require("./modules/getTweets.js");

const dotenv = require("dotenv");
dotenv.config();

const run = async () => {
    let tweets = await getTweets("DefGandy");
    console.log(tweets);
}

run();