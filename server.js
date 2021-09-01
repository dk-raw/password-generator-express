const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});
app.set('view engine', 'ejs');
app.use(express.static('public'));

const generatePassword = (length) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=<>,./?\|"
    let password = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
}

app.get('/', (req, res) => {
    /* res.send('Test') */
    /* res.json({ message: 'Test' }); */
    /* res.status(500).send('Internal Server Error'); */
    /* res.status(500).json({ message: 'Internal Server Error' }); */
    /* res.download('server.js'); */
    /* res.sendFile('server.js', { root: __dirname }); displays a file in the browser */
    /* res.render('index'); */
    /* res.redirect('https://google.com'); */
    const password = '12345';
    res.render('index.ejs', {
        title: 'Strong Password Generator',
        password: generatePassword(16)
    });
});

app.use((req, res) => {
    res.status(404).json('404 Not Found');
});

app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).json('500 Internal Server Error');
});