const express = require('express');
const http = require('http');
const massive = require('massive');
require('dotenv').config();

const app = express();

massive({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
}).then(instance => {
    app.set('db', instance);

    app.get('/', (req, res) => {
        req.app
            .get('db')
            .feed_items.find({
                'rating >': 0,
            })
            .then(items => {
                res.json(items);
            });
    });

    http.createServer(app).listen(3000);
});
