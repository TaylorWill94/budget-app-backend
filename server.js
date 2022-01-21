// DEPENDENCIES 
const dotenv = require('dotenv');
// IMPORTING APP.JS
const app = require("./app");

// CONFIGURATION
dotenv.config();
const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});