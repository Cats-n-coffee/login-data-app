const { Router } = require('express');
const userControllers = require('../controllers/userController');
const router = Router();

router.get('/', userControllers.homepageGet);

router.get('/login', userControllers.loginGet);

router.post('/login', userControllers.loginPost);

router.get('/signup', userControllers.signupGet);

router.post('/signup', userControllers.signupPost);


module.exports = router;