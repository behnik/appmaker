const express = require('express');
require('dotenv').config();
const pages_services = require('./services/pagesservices');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.use(require('body-parser').urlencoded({ extended: false }));

app.listen(
    process.env.BASE_PORT,
    process.env.BASE_HOST, async () => {
        await pages_services.init(app);
        console.log(`Example app listening on ${process.env.BASE_HOST}:${process.env.BASE_PORT}`)
    });