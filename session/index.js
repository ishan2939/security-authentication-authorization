const express = require('express');
const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');
const helmet = require('helmet');

dotenv.config({ path: path.join(__dirname, 'config', '.env') });

const app = express();

app.use(express());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(__dirname));

app.use(helmet());

app.use(sessions({  //create session
    secret: process.env.SECRET_KEY,
    saveUnitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));

const username = 'harkhanishan';
const password = '12345';

app.get('/', (req, res) => {
    let session = req.session;  //get session
    if (session.userid) { //if userid exists on session
        res.status(200).send(`<h1>Hey there, welcome <a href=\'/logout'>click to logout</a></h1>`); //show logout option
    }
    else {
        res.status(200).sendFile('views/index.html', { root: __dirname });  //else show login page
    }
});

app.post('/user', (req, res) => {
    if (req.body.username === username && req.body.password === password) {   //if credentials match
        let session = req.session;  //get session
        session.userid = req.body.username; //add username to session

        res.status(200).send(`<h1>Hey there, welcome <a href=\'/logout'>click to logout</a></h1>`); //show logout option
    }
    else {
        res.status(401).send("Invalid credentials");    //throw error if credentials don't match
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();  //destroy session to logout
    res.redirect('/');  //redirect to /
});

const PORT = process.env.PORT || 3000;

app.listen(3000, (req, res) => {
    console.log("Server started on port 3000...");
});