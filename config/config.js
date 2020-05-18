const express = require('express'),
    server = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    bcrypt = require('bcrypt'),
    saltRounds = 10,
    jwt = require('jsonwebtoken'),
    jwtPass = 'Ac@mic@2020';

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

module.exports = {
    server: server,
    bodyParser: bodyParser,
    cors: cors,
    bcrypt: bcrypt,
    saltRounds: saltRounds,
    jwt: jwt,
    jwtPass: jwtPass
}