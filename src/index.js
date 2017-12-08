
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mogoose from 'mongoose';
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;

import config from './config';
import routes from './routes';

let app = express();
app.server = http.createServer(app);

//MiddleWare
//parse applicaion/json
app.use(bodyParser.json({
  limit: config.bodyLimit
}));

//passport config
app.use(passport.initialize());
let Account = require('./model/account');
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
Account.authenticate()
));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


//api routes v1
app.use('/v1',routes);
app.server.listen(config.port);
console.log("Server Listeneing to port " + app.server.address().port);

export default app;
