// api/saveData.js

const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const formData = req.body;

    // Αποθήκευση δεδομένων σε αρχείο .txt
    const filePath = path.join(__dirname, '..', 'formData.txt');
    const dataToSave = `First Name: ${formData.firstName}, Last Name: ${formData.lastName}, Position: ${formData.position}, Company: ${formData.company}\n`;

    fs.appendFile(filePath, dataToSave, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        return res.status(500).json({ message: 'Error writing to file' });
      }
      res.status(200).json({ message: 'Data saved successfully' });
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
