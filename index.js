'use strict';

let express = require('express');
let app = express();

let apps = require('./src/controllers/app.js');
let auth = require('./src/controllers/auth.js');

app.use(express.json());

app.get('/', apps.index);
app.get('/login', auth.login);
app.post('/auth', auth.auth);

app.listen(3000, function(){
  console.log('Server listening on Port 3000.');
});
