const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Configuration CORS
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS || 'http://localhost:8081',
  methods: ['POST'],
  credentials: true
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route de test
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Serveur de formulaire Holon Systems opérationnel' });
});

// Route de soumission du formulaire
app.post('/submit', (req, res) => {
  console.log('📨 Nouvelle requête reçue sur /submit');
  const { name, email, organization, subject, message } = req.body;

  // Validation basique
  if (!name || !email || !message) {
    return res.status(400).json({ 
      error: 'Le nom, l\'email et le message sont requis.' 
    });
  }

  // Configuration du transporteur SMTP
  console.log('🔧 Configuration SMTP...');
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_PORT == '465', 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    }
  });

  // Mapping des sujets
  const subjectMap = {
    'projet': 'Projet / Prestation',
    'ideosphere': 'Déployer IdeoSphere',
    'rejoindre': 'Rejoindre l\'association',
    'contribuer': 'Contribuer / Bénévolat',
    'recherche': 'Recherche / Partenariat académique',
    'autre': 'Autre'
  };

  const subjectLabel = subjectMap[subject] || 'Message depuis le site';

  // Options de l'email
  const mailOptions = {
    from: `"Site Holon Systems" <${process.env.SMTP_USER}>`,
    to: process.env.EMAIL_TO || 'contact@holonsystems.org',
    replyTo: email,
    subject: `[Site Web] ${subjectLabel} - ${name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #A37A55; color: white; padding: 20px; text-align: center; }
          .content { background-color: #f8f7f2; padding: 20px; }
          .field { margin-bottom: 15px; }
          .field strong { color: #A37A55; }
          .message-box { background-color: white; padding: 15px; border-left: 4px solid #A37A55; margin-top: 20px; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Nouveau message depuis le site Holon Systems</h2>
          </div>
          <div class="content">
            <div class="field">
              <strong>Nom:</strong> ${name}
            </div>
            <div class="field">
              <strong>Email:</strong> <a href="mailto:${email}">${email}</a>
            </div>
            ${organization ? `<div class="field"><strong>Organisation:</strong> ${organization}</div>` : ''}
            <div class="field">
              <strong>Sujet:</strong> ${subjectLabel}
            </div>
            <div class="message-box">
              <strong>Message:</strong><br><br>
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div class="footer">
            <p>Ce message a été envoyé depuis le formulaire de contact du site Holon Systems.</p>
            <p>Répondre directement à cet email pour contacter ${name}.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  // Envoi de l'email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
      return res.status(500).json({ 
        error: 'Une erreur est survenue lors de l\'envoi du message.' 
      });
    }
    console.log('✅ Message envoyé:', info.messageId);
    res.status(200).json({ 
      success: true, 
      message: 'Message envoyé avec succès.',
      messageId: info.messageId 
    });
  });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`🚀 Serveur de formulaire Holon Systems démarré sur http://localhost:${port}`);
  console.log(`📧 Emails seront envoyés à: ${process.env.EMAIL_TO || 'contact@holonsystems.org'}`);
});
