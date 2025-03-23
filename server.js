const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware για να χειριζόμαστε JSON δεδομένα
app.use(express.json());

app.post('/saveData', (req, res) => {
    const formData = req.body; // Τα δεδομένα που στέλνει το frontend

    // Αποθήκευση δεδομένων σε αρχείο .txt
    const filePath = path.join(__dirname, 'formData.txt');
    const dataToSave = `First Name: ${formData.firstName}, Last Name: ${formData.lastName}, Position: ${formData.position}, Company: ${formData.company}\n`;

    fs.appendFile(filePath, dataToSave, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).send('Server error');
        }
        console.log('Data saved');
        res.status(200).send({ message: 'Data saved successfully!' });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
