const User = require('../models/UserSchema');

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
        res.status(200).json({ user: user.username })
        console.log('logged in ')
        
    }
    catch (err) {
        console.log(err);
    }
};

module.exports.signupGet = (req, res, next) => {
    res.render('signup', { title: 'Sign Up' });
};

module.exports.signupPost = async (req, res, next) => {

    try {
        const user = await new User({ 
            username: req.body.username,
            email: req.body.email, 
            password: req.body.password
         }); 
        user.save().then(newPost => {
            res.send(newPost);
            //res.redirect(301, '/')
        }, (err) => {
            res.status(400).send(err)//.render('index');
        });
        
    }
    catch (err) {
        console.log(err)
    }
    
};

module.exports.portalGet = (req, res, next) => {
    res.render('portal');
}

module.exports.portalPut = (req, res, next) => {
    console.log('portal put');
}

module.exports.portalDelete = (req, res, next) => {
    console.log('portal delete');
}