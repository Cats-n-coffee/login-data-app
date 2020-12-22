const { Router } = require('express');
const userControllers = require('../controllers/userController');
const router = Router();

router.get('/', userControllers.homepageGet);

router.get('/login', userControllers.loginGet);

router.post('/login', userControllers.loginPost);

router.get('/signup', userControllers.signupGet);

router.post('/signup', userControllers.signupPost);

router.get('/portal', userControllers.portalGet);

router.put('/portal', userControllers.portalPut);

router.delete('/portal', userControllers.portalDelete);


module.exports = router;