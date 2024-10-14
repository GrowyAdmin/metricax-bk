/**
 * Module authenticationPOST 
 * @summary This module is used to logic of the POST request about all authenticationPOST logic.
 * @author Juan David Alcala Sanchez
 */

/**
 * General Dependencies
 */


import model from '../../model.js';
import message from '../../utils/lang/message.js';
import passport from 'passport';
import helpers from './utils/crypt.js';
import LocalStrategy from 'passport-local';
import {Strategy as JWTStrategy, ExtractJwt} from 'passport-jwt';


passport.use('local.signin', new LocalStrategy({
    usernameField: 'emailUser',
    passwordField: 'passwordUser',
    passReqToCallback: true
}, async (req, nickname, password, done) => {
    try {
        const {body: dataUser} = req; 
        const { emailUser: email } = dataUser;
        
        const user = await model.getUserByEmail({email});
        console.log('user',user);
        console.log('dataUser',dataUser);
        const validate = await helpers.matchPassword(dataUser.passwordUser, user.password);
        if (!validate) return done(null, false, { message: message.Error.SignInError});

        delete user.password

        return done(null, user, { message: message.Success.UserLogged})
       
    } catch (e) {
        console.log("error internal", e);
        return done(null, false, { message: message.Error.SignInError})
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField : 'emailUser',
    passwordField : 'passwordUser',
    passReqToCallback: true
}, async (req, nickname, password, done) => {
    try {
        const {body: dataUser} = req; 
        console.log('data User', dataUser);

        const user = await model.getUserByEmail({email: dataUser.emailUser});
        if(user) return done(null, false, { message: message.Error.SignInError})
        
        const passwordEncrypted = await helpers.encryptPassword(dataUser.passwordUser);
        dataUser.passwordUser = passwordEncrypted; 
        
        const createUser = await model.createUser({email: dataUser.emailUser, password: passwordEncrypted, country: dataUser.country});
        return done(null, {idUser: createUser})
    } catch (error) {
        console.log("error",error);
        return done(null, false, { message: message.Error.SignInError})
    }
}))

let cookieExtractor = function(req) {
    let token = null;
    console.log('req in cookie extractor', req);
    console.log('req in cookie extractor', req.cookies);
    if (req && req.cookies) token = req.cookies['jwt'];
    return token;
  };
passport.use(new JWTStrategy({
    secretOrKey: 'TOP_SECRET',
    jwtFromRequest: cookieExtractor
}, async (token, done) => {
    try {
        console.log('token', token);
        return done(null, token)
    } catch (e) {
        done(e)
    }
}))

export default passport