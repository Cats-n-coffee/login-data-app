const { User } = require('../models/UserSchema');

module.exports.homepageGet = (req, res, next) => {
    res.render('index');
};

module.exports.loginGet = (req, res, next) => {
    res.render('login');
};

module.exports.loginPost = (req, res, next) => {
    console.log('login post')
};

module.exports.signupGet = (res, req, next) => {
    res.render('signup');
};

module.exports.signupPost = (req, res, next) => {
    console.log('signup post')
};