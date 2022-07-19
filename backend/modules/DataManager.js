const Fs = require("fs");

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
    let token = CreateToken();

    Fs.writeFileSync(__dirname + "/../data/verifytokens/" + id + ".json", JSON.stringify({ email: email, token: token, creationTime: new Date().getTime() }));

    return [id, token];
}

const VerifyToken = async id => {
    // later on once u get mongo, check for time
    let p = __dirname + "/../data/verifytokens/" + id + ".json";
    if (!Fs.existsSync(p)) return false;

    let d = JSON.parse(Fs.readFileSync(p));

    Fs.unlinkSync(p);

    // Then write the token data
    await CreateToken(d.token);

    return d.token;
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
    let suspectId = CreateToken();

    Fs.writeFileSync(__dirname + "/../data/suspects/" + suspectId + ".json", JSON.stringify(data));
    return suspectId;
}

const GetSuspectData = async id => {
    if (Fs.existsSync(__dirname + "/../data/suspects/" + suspectId + ".json"))
        return JSON.parse(Fs.readFileSync(__dirname + "/../data/suspects/" + suspectId + ".json"));
}

module.exports = {
    GenerateToken: GenerateToken,
    GetFormattedDate: GetFormattedDate,
    CreateToken: CreateToken,
    GetUserData: GetUserData,
    UpdateUserData: UpdateUserData,
    CreateSuspect: CreateSuspect,
    GetSuspectData: GetSuspectData,
    CreateVerifyToken: CreateVerifyToken,
    VerifyToken: VerifyToken
}