const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('index')
    console.log('home page')
});

router.get('/login', (req, res) => {
    console.log('login page')
});

module.exports = router;