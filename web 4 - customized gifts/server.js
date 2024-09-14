const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files (CSS, images, etc.)

// Order Route (WhatsApp integration)
app.post('/sendOrder', (req, res) => {
    const { productName, customerName, customerPhone, customerEmail, customerAddress, customMessage } = req.body;

    // Construct the WhatsApp message
    const whatsappMessage = `
        *Order Details*:
        - Product: ${productName}
        - Name: ${customerName}
        - Phone: ${customerPhone}
        - Email: ${customerEmail}
        - Address: ${customerAddress}
        - Custom Message: ${customMessage}
    `;

    // Replace 'YOUR_PHONE_NUMBER' with your actual WhatsApp number including country code
    const whatsappUrl = `https://wa.me/918955781856?text=${encodeURIComponent(whatsappMessage)}`;

    // Redirect the customer to WhatsApp
    res.redirect(whatsappUrl);
});

// Start the server on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
