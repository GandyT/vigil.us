const Fs = require("fs");

/* 
TEMPORARY ASYNC IN PREPARATION FOR ONLINE DATABASE
*/

const GenerateToken = () => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let tokenLength = 12;
    let token = "";

    for (let i = 0; i < tokenLength; ++i) {
        let r = Math.floor(Math.random() * str.length);
        token += str[r];
    }

    return token;
}

const GetFormattedDate = () => {
    let d = new Date();

    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
}

/* REPLACE WITH MONGODB IN FUTURE OR SOME ONLINE DATABASE */
const CreateToken = async token => {

    let tokenData = {
        token: token,
        suspects: [], // Id of suspects created by the token
        creationDate: GetFormattedDate(), // AccCreation Date  
    }

    // Write
    Fs.writeFileSync(__dirname + "/../data/tokens/" + token + ".json", JSON.stringify(tokenData));
    return token;
}

const CreateVerifyToken = async email => {
    let id = GenerateToken();
    let token = GenerateToken();

    Fs.writeFileSync(__dirname + "/../data/emails/" + email + ".json", JSON.stringify({ email: email, verify: false }));
    Fs.writeFileSync(__dirname + "/../data/verifytokens/" + id + ".json", JSON.stringify({ email: email, token: token, creationTime: new Date().getTime() }));

    return [id, token];
}

const VerifyToken = async id => {
    // later on once u get mongo, check for time
    let p = __dirname + "/../data/verifytokens/" + id + ".json";
    if (!Fs.existsSync(p)) return false;

    let d = JSON.parse(Fs.readFileSync(p));

    Fs.writeFileSync(__dirname + "/../data/emails/" + d.email + ".json", JSON.stringify({ email: d.email, verify: true }));
    Fs.unlinkSync(p);

    // Then write the token data
    await CreateToken(d.token);

    return d.token;
}

const EmailExists = async email => {
    return Fs.existsSync(__dirname + "/../data/emails/" + email + ".json");
}

const GetUserData = async token => {
    if (Fs.existsSync(__dirname + "/../data/tokens/" + token + ".json"))
        return JSON.parse(Fs.readFileSync(__dirname + "/../data/tokens/" + token + ".json"))
}

const UpdateUserData = async (token, data) => {
    if (Fs.existsSync(__dirname + "/../data/tokens/" + token + ".json")) {
        Fs.writeFileSync(__dirname + "/../data/tokens/" + token + ".json", JSON.stringify(data));
        return true;
    }

    return false;
}

const CreateSuspect = async data => {
    let suspectId = GenerateToken();
    data.id = suspectId;
    if (!data.socials.twitter) data.socials.twitter = "";
    if (!data.socials.instagram) data.socials.instagram = "";
    if (!data.socials.youtube) data.socials.youtube = "";

    Fs.writeFileSync(__dirname + "/../data/suspects/" + suspectId + ".json", JSON.stringify(data));
    return suspectId;
}

const GetSuspectData = async id => {
    if (Fs.existsSync(__dirname + "/../data/suspects/" + id + ".json"))
        return JSON.parse(Fs.readFileSync(__dirname + "/../data/suspects/" + id + ".json"));
}

const UpdateSuspect = async (token, data) => {
    let d = await GetSuspectData(data.id);

    if (!d) return false;
    if (d.authToken != token) return false;

    for (let key of Object.keys(d)) {
        if (data[key])
            d[key] = data[key];
    }

    Fs.writeFileSync(__dirname + "/../data/suspects/" + data.id + ".json", JSON.stringify(data));

    return true;
}

module.exports = {
    GenerateToken: GenerateToken,
    GetFormattedDate: GetFormattedDate,
    CreateToken: CreateToken,
    EmailExists: EmailExists,
    GetUserData: GetUserData,
    UpdateUserData: UpdateUserData,
    CreateSuspect: CreateSuspect,
    GetSuspectData: GetSuspectData,
    UpdateSuspect: UpdateSuspect,
    CreateVerifyToken: CreateVerifyToken,
    VerifyToken: VerifyToken
}