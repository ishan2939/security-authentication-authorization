const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const helmet = require('helmet');

const app = express();

//app.use(helmet());


//usage of helmet
app.use(
    helmet({
        referrerPolicy: { policy: "no-referrer" },
        contentSecurityPolicy: false,
    })
);

//usage of cors
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST']
}));

app.use(express());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname + '/public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));


const userCredentials = {
    "username": "harkhanishan",
    "password": '12345678'
}

app.get('/welcome', (req, res) => { //welcome page
    let username = req.cookies.username;    //get username from cookie

    return res.render('welcome', { username });
});

app.get('/', (req, res) => {
    let username = req.cookies['username']; //get username from cookie

    return res.render('home', { username });
});

app.get('/login', (req, res) => {
    let warn = req.query.msg ? true : false;    //check if there is any error

    if (warn) {
        return res.render('login', {
            error: "Invalid credentials"    //then pass error
        });
    }
    else {
        res.render('login');    //else don't pass error
    }
});

app.post('/login', (req, res) => {
    let { username, password } = req.body;

    if (username === userCredentials.username && password === userCredentials.password) {   //check if credentials are right
        res.cookie("username", username);   //set the cookie
        return res.redirect('/');
    }
    else {
        return res.redirect('/login?msg=failed');   //if credentials are not right then show error
    }
});

app.get('/logout', (req, res) => {  //logout
    res.clearCookie("username");    //delete the cookie
    return res.redirect('/login');
})

//normal cookie operations
/*
app.get('/', (req,res) => {
    res.send('<h1>Welcome to cookie world👋</h1>');
});

app.get('/setcookie', (req, res)=>{
    res.cookie('name', 'ishan harkhani');
    res.send('<h1>Cookie has been saved successfully.👋</h1>')
});

app.get('/getcookie', (req, res)=>{
    console.log(req.cookies.name);
    res.json({
        name: req.cookies.name
    });
});

app.get('/deletecookie', (req, res)=>{
    res.clearCookie("name");
    res.send('<h1>Cookie is deleted now.</h1>')
});
*/
app.listen(3000, (req, res) => {
    console.log("Server started on port 3000...");
});