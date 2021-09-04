if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
let visitorNumber = 0;

const generatePassword = (length) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=<>,./?\|[]{};:`~"
    let password = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
}

app.get('/', (req, res) => {
    const current = new Date();
    const time = current.toLocaleTimeString("en-US");
    res.render('index.ejs', {
        title: 'Strong Password Generator',
        time: time
    });
});

app.post('/generate', (req, res) => {
    const length = req.body.length || 16;
    const current = new Date();
    const time = current.toLocaleTimeString("en-US");
    visitorNumber++
    res.render('generate.ejs', {
        title: 'Strong Password Generator::Generate',
        password: generatePassword(length),
        passwordLength: length,
        visitorNumber: visitorNumber,
        time: time
    });
    res.end();
});

const aboutRouter = require('./routes/about');

app.use('/about', aboutRouter);

//client
app.use((req, res) => {
    res.status(404).json('404 Not Found');
});
app.use((req, res) => {
    res.status(400).json('400 Bad Request');
});
//server
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).json('500 Internal Server Error');
});

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});