const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('about.ejs', {
        title: 'Strong Password Generator::About'
    });
});

router.get('/tos', (req, res) => {
    res.render('tos.ejs', {
        title: 'Strong Password Generator::Terms of Use'
    });
});

module.exports = router;