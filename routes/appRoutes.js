const { Router } = require('express');
const userControllers = require('../controllers/userController');
const router = Router();

router.get('/', userControllers.homepageGet);

router.get('/login', userControllers.loginGet);

// router.post('/login', (req, res) => {
//     console.log('login post')
// })

router.get('/signup', userControllers.signupGet);

// router.post('/signup', (req, res) => {
//     console.log('signup post')
// })
module.exports = router;