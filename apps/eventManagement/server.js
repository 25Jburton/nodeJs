const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const { DB_USER, DB_PASSWORD, DB_NAME } = require('./credentials');
const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.6rforvx.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const event = require('./models/event');
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(dbURL)
  .then((res) => {
    app.listen(port, () => {
        console.log(`Connected to MongoDB on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Could not connect to MongoDB:', err);
}); 

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get(['/', '/home'], (req, res) => {
    event.find().then((result) => {
        res.render(__dirname +'/views/dashboard.ejs', { title: 'Welcome to the Dashboard!', events: result })
        console.log(`Data returned: ${result}`);
    })
    .catch((err) => {
        console.error(err); 
    })
});

app.get('/team-form', (req, res) => {
    res.render(__dirname +'/views/sampleForm.ejs');
});

// posting form data to DB
app.post('/sample-form-submit', async (req, res) => {
    try {
        const newEvent = new event(req.body);
        const savedItem = await newEvent.save();
        res.redirect('/');
        console.log(savedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});