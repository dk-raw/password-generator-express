if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
//const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const current = new Date();
    const time = current.toLocaleTimeString("en-US");
    res.render('index.ejs', {
        title: 'Strong Password Generator',
        time: time
    });
});

const generateRouter = require('./routes/generate');
app.use('/generate', generateRouter);

//client errors
app.use((req, res) => {
    res.status(400).json('400 Bad Request');
});
app.use((req, res) => {
    res.status(404).json('404 Not Found');
});
//server errors
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).json('500 Internal Server Error');
});

/* mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
}); */

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});