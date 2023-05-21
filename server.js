const express = require('express');
const app = express();
const path = require('path');
var mongoose = require("mongoose");
const session = require('express-session');
var bodyParser = require("body-parser");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://0.0.0.0:27017/gym", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var userSchema = new mongoose.Schema({
    userFirstName: {
        type: String,
        unique: false,
    },
    userLastName: {
        type: String,
        unique: false,
    },
    userEmail: {
        type: String,
        unique: true,
    },
    userGender: {
        type: String,
        unique: true,
    },
    userPassword: {
        type: String,
        unique: false,
    },
});
var User = mongoose.model("User", userSchema);

app.use(express.json());

app.use(express.static("public"));

app.use(
    session({
        secret: "12345678",
        resave: false,
        saveUninitialized: false,
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HomePg.html'));
});

app.post("/login", (req, res) => {
    console.log(req.body);
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ userEmail: email, userPassword: password })
        .then((user) => {
            if (user) {
                console.log(user);
                req.session.user = user;
                return res.status(200).json({ message: "successfully logged-in" });
            } else {
                console.log(user);
                res.status(401).json({ message: "invalid username and password" });
            }
        })
        .catch((err) => {
            res.status(401).json({ message: "unexpected error occured" });

        });
});

app.post("/signup", (req, res) => {
    console.log(req.body);
    var user = new User({
        userFirstName: req.body.fname,
        userLastName: req.body.lname,
        userGender: req.body.gender,
        userEmail: req.body.email,
        userPassword: req.body.password,
    });
    user.save().then((item) => {
            res.status(200).json({ message: "successfully registered" });
        }).catch((err) => {
            console.log(err);
            res.status(401).json({ message: "invalid username and password" });

        });
});

app.listen(3000, () => {
    console.log('port is connected');
});
