const { google } = require("googleapis");
const express = require("express");
const app = express();
const { Pool } = require("pg");


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'invitego',
    password: '',
    port: 5432,
  });

const client_id = '528477820964-i033l7i3e2cv3dn3mmqguhb3g50k8gr3.apps.googleusercontent.com';
const client_secret = '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';
const redirect_uris = ['https://localhost:3000/oauth2callback'];
const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN';
const REFRESH_TOKEN = 'YOUR_REFRESH_TOKEN';

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0],
  'https://www.googleapis.com/auth/gmail.send'
);

// Set the credentials on the client (you can use a saved token instead of creating a new one)
oAuth2Client.setCredentials({
    access_token: ACCESS_TOKEN,
    refresh_token: REFRESH_TOKEN,
  });

  // Create a new Gmail client
const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

// Get an access token for the authenticated user
async function getAccessToken() {
  const token = await getSavedTokenFromDatabase(); // Replace with your implementation to get the saved token for the authenticated user
  oAuth2Client.setCredentials(token);
  return oAuth2Client.getAccessToken();
}

// Send an email
async function sendEmail(to, subject, body) {
    const message = [
      `To: ${to}`,
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      `Subject: ${subject}`,
      '',
      body,
    ].join('\n');
  
    const encodedMessage = Buffer.from(message).toString('base64');
  
    const res = await gmail.users.messages.send({
      userId: userId,
      requestBody: {
        raw: encodedMessage,
      },
    });
  
    console.log(`Message sent: ${res.data.id}`);
  }

  // List the user's messages
async function listMessages() {
    const res = await gmail.users.messages.list({
      userId: userId,
    });
  
    console.log(`Messages: ${res.data.messages.length}`);
  }
  
  // Get a message by ID
  async function getMessageById(id) {
    const res = await gmail.users.messages.get({
      userId: userId,
      id: id,
    });
  
    console.log(`Message subject: ${res.data.payload.headers.find(header => header.name === 'Subject').value}`);
  }
  
  // Listen for incoming messages
  function watchUser(userId) {
    const watch = gmail.users.watch({
      userId: userId,
      requestBody: {
        topicName: process.env.TOPIC_NAME,
      },
    })};
  
  watch.on('data', (data) => {
    console.log('Incoming message:', data);
  });
  

// API route to send an email
app.post('/api/send-email', async (req, res) => {
    const userId = req.params.userId;
    const { recipientEmail, subject, body } = req.body;
    try {
      await sendEmail(userId, recipientEmail, subject, body);
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    }
  });
