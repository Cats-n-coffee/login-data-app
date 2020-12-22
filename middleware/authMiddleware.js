const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');

const secret = process.env.SECRET;

const requireToken = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, secret, (err, decriptedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login')
            } else {
                console.log(decriptedToken)
                next()
            }
        })
    } else {
        res.redirect('/login');
    }
}

const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, secret, async (err, decriptedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                const user = await User.findById(decriptedToken.id);
                res.locals.user = user;
                next()
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = { verifyToken, requireToken };