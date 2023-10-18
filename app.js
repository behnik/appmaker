const express = require('express');
const pages_services = require('./services/pagesservices');

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.use(require('body-parser').urlencoded({ extended: false }));

pages_services.init(app);

app.listen(1557, () => {
    console.log(`Example app listening on port 1557`)
});