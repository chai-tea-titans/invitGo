const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
const client_id = '528477820964-i033l7i3e2cv3dn3mmqguhb3g50k8gr3.apps.googleusercontent.com';
const client_secret = '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';
const redirect_uris = ['https://localhost:3000/oauth2callback'];

const oauth2Client = new OAuth2(
    client_id,
    client_secret,
    redirect_uris
);

function getAuthUrl() {
    return oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
  }
  
  async function getTokensFromCode(code) {
    try {
      const { tokens } = await oauth2Client.getToken(code);
      return tokens;
    } catch (error) {
      console.error('Error getting tokens:', error);
    }
  }
  
  module.exports = {
    getAuthUrl,
    getTokensFromCode,
  };

