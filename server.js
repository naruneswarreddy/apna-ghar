const mongoose = require("mongoose");
const app = require("./app");

const port = 8080;
const dbUrl = process.env.ATLASDB_URL;

mongoose.connect(dbUrl)
    .then(() => {
        console.log("Mongoose connection established.");
    })
    .catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Listening to port ${port}.`);
});