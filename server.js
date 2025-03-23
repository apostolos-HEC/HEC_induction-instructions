const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// Body parser για να διαβάσουμε τα δεδομένα της φόρμας
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const token = 'YOUR_GITHUB_TOKEN';  // Εδώ βάζεις το προσωπικό token σου
const repoOwner = 'apostolos-HEC';
const repoName = 'HEC_induction-instructions';
const filePath = 'new_form_data.json';  // Όνομα του αρχείου που θέλεις να αποθηκεύεις τα δεδομένα

// Ρουτίνα για αποθήκευση των δεδομένων στο GitHub repository
app.post('/submit-form', (req, res) => {
    const userData = req.body;

    // Δημιουργία του νέου αρχείου με τα δεδομένα
    const fileContent = JSON.stringify(userData, null, 2);

    // Δημιουργία ή ενημέρωση του αρχείου στο GitHub
    axios.put(
        `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`,
        {
            message: 'Add new form data',
            content: Buffer.from(fileContent).toString('base64'),
            branch: 'main',  // Μπορείς να το προσαρμόσεις ανάλογα με το branch σου
        },
        {
            headers: {
                Authorization: `token ${token}`,
            }
        }
    )
    .then((response) => {
        res.send('Data successfully saved!');
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Error saving data to GitHub.');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
