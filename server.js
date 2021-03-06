const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
//const jwt = require ('jsonwebtoken')

const users = require('./routes/api/users');
//const profile = require('./routes/api/profile');
//const posts = require('./routes/api/posts');

const app = express();



//bodyParser

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB

const db = require('./config/keys').mongoURI;


//Mongo Config



mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//Passport middle-ware



app.use(passport.initialize());
//require("./config/passport")(passport);




//Routes for use

app.use('/api/users', users);
//app.use('/api/profile', profile);
//app.use('/api/posts', posts);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(process.env.PORT || 5000, function(){
   console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
   
});




//const port = process.env.PORT || 5000;

//app.listen(port, () => console.log('Server running on port ${port}'));

