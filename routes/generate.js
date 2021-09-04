const express = require('express');
const router = express.Router();
let totalPasswordsGenerated = 0;

const generatePassword = (length) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=<>,./?\|[]{};:`~"
    let password = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
}

router.post('/', (req, res) => {
    const length = req.body.length || 16;
    const current = new Date();
    const time = current.toLocaleTimeString("en-US");
    totalPasswordsGenerated++;
    res.render('generate.ejs', {
        title: 'Strong Password Generator::Generate',
        password: generatePassword(length),
        passwordLength: length,
        totalPasswordsGenerated: totalPasswordsGenerated,
        time: time
    });
    res.end();
});

module.exports = router;