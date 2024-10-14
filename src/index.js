import express, { urlencoded} from 'express'
import {engine} from 'express-handlebars'
import ___dirname from './utils.js'
import * as path from "path"
import router from './server/routes/routes.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()

import passport from 'passport';
import passportData from './server/api/account/services/passport/index.js';

const app = express()
const PORT = 3000

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true}))
app.use(passport.initialize());

// Structure code handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(___dirname + "/views"))

// Static files
app.use("/", express.static(___dirname + "/public"))

app.get("/", passport.authenticate('jwt', { failureRedirect: '/login',session: false }), (req, res) => {
    res.render("home", {
        title: "Home Tab",
        admin: false,
    })
});

app.get("/login", (req, res) => {
    if (req && req.cookies['jwt']) res.redirect('/')
        
    res.render("login", {
        title: "Login",
        admin: false,
        layout: false
    })
});


// Backend routes
app.use('/api', router);

app.listen(PORT, () => {
    console.log('server by port', PORT);
})