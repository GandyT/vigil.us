const {TwitterApi} = require("twitter-api-v2");
const getSentiment = require("./getSentiment");

var client = null;

const getTweets = async (username) => {
    if (!client) {
        client = new TwitterApi({
            appKey: process.env.APIKEY,
            appSecret: process.env.APISECRET,
            accessToken: process.env.ACCESSTOKEN,
            accessSecret: process.env.ACCESSSECRET
        })
    }

    try {
        var userTimeline = await client.v1.userTimelineByUsername(username);
    } catch {
        return []
    }
    const tweets = [];

    for (tweet of userTimeline.tweets) {
        sentiment = await getSentiment(tweet["full_text"]);
        tweets.push({
            tweet: tweet["full_text"],
            sentiment: sentiment
        })
    }
    return tweets;
}

module.exports = getTweets;