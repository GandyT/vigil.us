const Express = require("express");
const App = Express();
App.disable("x-powered-by");

const Fs = require("fs");

const cors = require("cors");
const path = require("path");
const BodyParser = require("body-parser");
const FileUpload = require("express-fileupload")
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 80;

/* MIDDLEWARE */
App.use(cors());
App.use(BodyParser.json());
App.use(BodyParser.urlencoded({ extended: false }));
App.use(FileUpload({ createParentPath: true }))

/* ROUTES */
let files = Fs.readdirSync("routes");
files.forEach(file => {
    if (file.endsWith(".js")) {
        let data = require(`./routes/${file}`);
        App.use(`/api/${data.path}`, data.router);
    }
});

/* CATCH ALL FRONTEND */
App.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../frontend/build/index.html'));
});

App.listen(port, console.log(`App listening on port ${port}`));