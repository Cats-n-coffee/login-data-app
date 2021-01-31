const User = require('../models/UserSchema');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;
const maxAge = 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: maxAge })
}

const handleErrors = (err) => {
    if (err.message === 'incorrect email'){
        return 'Incorrect email or password';
    }
    if (err.message === 'incorrect password') {
        return 'Incorrect email or password';
    }
    if (err.errors['username']) {
        return err.errors['username'].message;
    }
    if (err.errors['email']) {
        return err.errors['email'].message;
    }
    if (err.errors['password']) {
        return err.errors['password'].message;
    }
}

module.exports.homepageGet = (req, res, next) => {
    res.render('index', { title: 'Home' });
};

module.exports.loginGet = (req, res, next) => {
    res.render('login', { title: 'Login' });
};

module.exports.loginPost = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.checkPassword(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user.username })
        console.log('logged in ')
        
    }
    catch (err) {
        const newErr = handleErrors(err);
        res.status(401).json({ error: newErr });
        console.log(newErr);
    }
};

module.exports.signupGet = (req, res, next) => {
    res.render('signup', { title: 'Sign Up' });
};

module.exports.signupPost = async (req, res, next) => {

    const { username, email, password } = req.body;

    try {
        const user = await User.create({ username, email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
        
    }
    catch (err) {
        const newErr = handleErrors(err);
        res.status(400).json({ error: newErr });
        console.log(newErr)
    }
    
};

// module.exports.portalGet = (req, res, next) => {
//     res.render('portal', { title: 'My Portal' });
// }

module.exports.portalPut = (req, res, next) => {
    console.log('portal put');
}

module.exports.portalDelete = (req, res, next) => {
    console.log('portal delete');
}

module.exports.logoutGet = (req, res, next) => {
    console.log('logged out')
    res.cookie('jwt', {}, { maxAge: 1 });
    res.redirect('/');
}