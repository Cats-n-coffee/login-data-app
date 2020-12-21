
const User = require('../models/UserSchema');

module.exports.homepageGet = (req, res, next) => {
    res.render('index', { title: 'Home' });
};

module.exports.loginGet = (req, res, next) => {
    res.render('login', { title: 'Login' });
};

module.exports.loginPost = (req, res, next) => {
    console.log('login post')
};

module.exports.signupGet = (req, res, next) => {
    res.render('signup', { title: 'Sign Up' });
};

module.exports.signupPost = async (req, res, next) => {
    //const { username, email, password } = req.body;

    try {
        const user = await new User({ 
            username: req.body.username,
            email: req.body.email, 
            password: req.body.password
         }); 
        user.save().then(newPost => {
            res.send(newPost);
        }, (err) => {
            res.status(400).send(err);
        });
        
    }
    catch (err) {
        console.log(err)
    }
    
};