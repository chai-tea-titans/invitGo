const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
module.exports = app;

const apiRoutes = require('./routes/api');
// const morgan = require('morgan');


app.use(cors());



// logging middleware
// app.use(morgan('dev'))

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// Routes that will be accessed via AJAX should be prepended with
// /api so they are isolated from our GET /* wildcard.
app.use("/api", require("./api"));




// OLD CODE ----- auth and api routes-----  --- still needed?
// app.use('/auth', require('./auth'))
// app.use('/api', require('./api'))
// app.use('/api', apiRoutes);

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
