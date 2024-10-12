import express, { urlencoded} from 'express'
import {engine} from 'express-handlebars'
import ___dirname from './utils.js'
import * as path from "path"
import router from './server/routes/routes.js'

const app = express()
const PORT = 3000

app.use(express.json());
app.use(urlencoded({ extended: true}))


// Structure code handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(___dirname + "/views"))

// Static files
app.use("/", express.static(___dirname + "/public"))


app.get("/", (req, res) => {
    res.render("home", {
        title: "Home Tab",
        admin: false
    })
});

// Backend routes
app.use('/api', router);

app.listen(PORT, () => {
    console.log('server by port', PORT);
})