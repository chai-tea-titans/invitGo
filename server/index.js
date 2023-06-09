const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();

module.exports = app;
app.use(cors());
// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));
// Routes that will be accessed via AJAX should be prepended with
// /api so they are isolated from our GET /* wildcard.
app.use("/api", require("../pages/api/index"));

// Disable to handle favicon.ico in vercel
app.use('/favicon.ico', (req, res) => res.status(204));

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
