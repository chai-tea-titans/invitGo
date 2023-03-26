const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const { Pool } = require("pg");
const { google } = require("googleapis");
const emailRouter = require("./email");
const oauth2 = require("./oauth2");
const { getAuthUrl, getTokensFromCode } = require("./auth");


const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "invitego",
  password: "",
  port: 5432,
});


const client_id =
  "528477820964-i033l7i3e2cv3dn3mmqguhb3g50k8gr3.apps.googleusercontent.com";
const client_secret = "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";
const redirect_uris = ["https://localhost:3000/oauth2callback"];
const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];

const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0],
  );
  
// Gmail client
  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

// Set up an API route to send an email
app.post("/api/send-email", async (req, res) => {
    const { recipientEmail, subject, body } = req.body;
  
    // Get the access token for the authenticated user
    const tokens = await getTokensFromDatabase(req.user.id); // Replace with your implementation to get the saved token for the authenticated user
    oAuth2Client.setCredentials(tokens);
    const accessToken = await oAuth2Client.getAccessToken();
  
    // Construct the email message
    const message = [
      `To: ${recipientEmail}`,
      "Content-Type: text/html; charset=utf-8",
      "MIME-Version: 1.0",
      `Subject: ${subject}`,
      "",
      body,
    ].join("\n");
  
    const encodedMessage = Buffer.from(message).toString("base64");
  
    // Send the email
    try {
    const res = await gmail.users.messages.send({
      userId: userId,
      requestBody: {
        raw: encodedMessage,
      },
      auth: {
        type: "OAuth2",
        user: userId,
        clientId: client_id,
        clientSecret: client_secret,
        refreshToken: tokens.refresh_token,
        accessToken: accessToken,
      },
    });
  
    console.log(`Message sent: ${res.data.id}`);
    res.status(200).send("Email sent successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error sending email");
  }
});
  
  // Set up the email router
  app.use("/api/email", emailRouter);
  

app.use(cors());
// Body parsing middleware

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// Static file-serving middleware

app.use(express.static(path.join(__dirname, "..", "public")));
// Routes that will be accessed via AJAX should be prepended with
// /api so they are isolated from our GET /* wildcard.

app.use("/api", require("./api"));
// This middleware will catch any URLs resembling a file extension
// for example: .js, .html, .css
// This allows for proper 404s instead of the wildcard '#<{(|' catching
// URLs that bypass express.static because the given file does not exist.

app.use((req, res, next) => {
    if (path.extname(req.path).length > 0) {
        res.status(404).end();
    } else {
        next();
    }
});
// Error catching endware
app.use((err, req, res, next) => {
    console.error(err, typeof next);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error.");
});


module.exports = app;
