let fs = require('fs');
let jwt = require('jsonwebtoken');

exports.login = function(req, res) {
    const Users = require('../models').User;
    Users.findOne({
        where: {
            login: req.headers.login,
            password: req.headers.password
        }
    }).then(user => {
        if (user === null) {
            res.status(400).send('');
        } else {
            signToken(user.login,user.nick)
                .then((data) => {
                    res.send(data);
                })
                .catch((err) => {
                    res.status(400).send('');
                });
        }
    });
};

exports.auth = function(req, res) {
    decodeToken(req.body.token)
        .then((decoded) => {
            signToken(decoded.login,decoded.nick)
                .then((data) => {
                    res.send(data);
                })
                .catch((err) => {
                    res.status(400).send('');
                });
        })
        .catch((err) => {
            res.status(400).send('');
        });
};

signToken = function(login,nick) {
    return new Promise(function (resolve, reject) {
        let cert = fs.readFileSync('data/key.prv');
        jwt.sign(
            {
                login: login,
                nick: nick,
                exp: Math.floor(Date.now() / 1000) + (60 * 60)
            },
            cert,
            {algorithm: 'RS256'},
            function (err, token) {
                if (err) {
                    reject(err);
                } else {
                    let data = {};
                    data.token = token;
                    data.nick = nick;
                    resolve(data);
                }
            }
        );
    });
};

decodeToken = function(token) {
    return new Promise(function (resolve, reject) {
        let cert = fs.readFileSync('data/key.pub');
        jwt.verify(
            token,
            cert,
            function(err, decoded) {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            }
        );
    });
};