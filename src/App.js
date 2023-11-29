require('dotenv').config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const schema = require("./schemas/studentCourseSurvey");
 
const app = express();
const PORT = process.env.PORT;
 
//CSRF setup
const csrfProtect = csrf({
  cookie: true,
});
 
// Middleware
app.use(express.json()); // Parse JSON bodies for this app
app.use(cors({ // use CORS
credentials: true, 
origin: process.env.allowed_origins
})); 
app.use(cookieParser()); // cookieparser, required for csurf
app.use(csrfProtect); // use CSRF protection
 
// Route for CSRF token
app.get("/getCSRFToken", function (req, res) {
  res.json({ CSRFToken: req.csrfToken() });
});
 
// GET route for sending schema
app.get("/api", function (req, res) {
  res.json(schema);
});
 
// POST route
app.post("/api", async (req, res) => {
  // req.body is our survey response; send this back to your real database here
  res.send(req.body);
});
 
app.listen(PORT, () =>
  console.log(`Hello world app listening on port ${PORT}!`)
);
