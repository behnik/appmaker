const express = require('express');
const pages_services = require('./services/pagesservices');
const crons_services = require('./services/cronservices');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.use(require('body-parser').urlencoded({ extended: false }));

crons_services.init();
pages_services.init(app);

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
});