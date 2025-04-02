const express = require('express');
const ejs = require('ejs');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const { DB_USER, DB_PASSWORD, DB_NAME } = require('./credentials');
const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.6rforvx.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const event = require('./models/event');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('Content for page');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

mongoose
  .connect(dbURL)
  .then((result) => {
    app.listen(port, () => {
        console.log(`Connected to MongoDB on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Could not connect to MongoDB:', err);
  }); 