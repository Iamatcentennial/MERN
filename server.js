const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const app = express();

// config keys
const db = require('./config/keys').mongoURI;

//connecting to mongodb using mongoose
mongoose.connect(db)
    .then(() => {
        console.log('Database connected to Mongo');
    })
    .catch((err) => {
        console.log(err);
    })
// support parsing of application/json type post data
app.use(bodyparser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyparser.urlencoded({
    extended: true
}));

// Routes
app.use('/api/posts', posts);
app.use('/api/users', users);
app.use('/api/profile', profile);

app.get('/', (req, res) => res.send('Welcome to network of web-developers'));

const port = process.env.PORT || 5500;

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})