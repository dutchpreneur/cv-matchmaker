const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/api/run-analysis', upload.fields([{ name: 'job-ad' }, { name: 'cv' }]), async (req, res) => {
    const email = req.body.email;
    const jobAd = req.files['job-ad'][0];
    const cvs = req.files['cv'];

    if (!email || !jobAd || !cvs) {
        return res.status(400).send('Missing required fields');
    }

    // Save email to database (this is just an example, replace with your DB logic)
    fs.appendFileSync('emails.txt', `${email}\n`);

    // Run your LLM analysis (replace this with your actual LLM logic)
    const analysisResults = 'Analysis results...';

    // Send email with results (configure with your email service)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Job Match Pro Analysis Results',
        text: analysisResults
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Analysis is being processed. Results will be sent to your email.');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error processing analysis');
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
