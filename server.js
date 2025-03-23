const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Εξυπηρέτηση στατικών αρχείων από τη ρίζα του project
app.use(express.static(path.join(__dirname)));

// ✅ Διαδρομή για το greek.pdf
app.get('/greek.pdf', (req, res) => {
    res.sendFile(path.join(__dirname, 'greek.pdf'));
});

// ✅ Διαδρομή για το formData.txt (αν θες να το βλέπεις)
app.get('/formData.txt', (req, res) => {
    res.sendFile(path.join(__dirname, 'formData.txt'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
