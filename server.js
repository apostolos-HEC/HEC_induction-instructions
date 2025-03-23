const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Επιτρέπει στο Express να σερβίρει στατικά αρχεία από τον κύριο φάκελο
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Διανομή του αρχείου greek.pdf από τον main φάκελο
app.get('/greek.pdf', (req, res) => {
    res.sendFile(path.join(__dirname, 'greek.pdf'));
});

// Αποθήκευση των δεδομένων της φόρμας σε αρχείο
app.post('/save-form', (req, res) => {
    const formData = JSON.stringify(req.body, null, 2);

    fs.appendFile('formData.txt', formData + '\n', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            res.status(500).send('Error saving data');
        } else {
            console.log('Form data saved');
            res.send('Form data received');
        }
    });
});

// Εκκίνηση του server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
