const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

// Σερβίρει το PDF
app.get('/greek.pdf', (req, res) => {
    res.sendFile(path.join(__dirname, '../greek.pdf'));
});

// Εξάγει την Express εφαρμογή για Vercel
module.exports = app;
