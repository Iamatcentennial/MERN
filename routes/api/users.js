const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const User = require('../../models/User');
// @route GET api/users/test
// @ desc Tests users route
// @ access private
router.get('/test', (req, res) => {
    res.json({
        msg: "Users working"
    });
});

// @route GET api/users/test
// @ desc Tests users route
// @ access public
router.post('/register', (req, res) => {
    User.findOne({
            email: req.body.email
        })
        .then((user) => {
            if (user) {
                res.json({
                    email: 'email already exists'
                });
            } else {
                // Getting the avatar associated with an email address
                const avatar = gravatar.url(req.body.email, {
                    s: '200', // size
                    r: 'pg', // rating
                    d: 'mm' // default
                });

                // creating a new document by creating a new instance of model
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    avatar
                });

                // hashing the password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        // storing the new document to mongodb
                        newUser.save()
                            .then((user) => {
                                res.json(user)
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    });
                });
            }
        });

});

router.post('/login', (req, res) => {
    User.findOne({
            email: req.body.email
        })
        .then((user) => {
            if (!user) {
                res.status(404).json({
                    email: 'User with the given email does not exist'
                });
            }
            bcrypt.compare(req.body.password, user.password)
                .then((isMatch) => {
                    if (isMatch) {
                        res.json({
                            password: 'login sucess'
                        });
                    } else {
                        res.json({
                            password: 'password incorrect'
                        });
                    }
                });


        })
});


module.exports = router;