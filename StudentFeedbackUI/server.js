const express = require("express");
const path = require("path");
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Set the MIME type for CSS files
app.use((req, res, next) => {
  if (req.url.endsWith(".css")) {
    res.setHeader("Content-Type", "text/css");
  }0xBe58E7C0b9043144aE5B4672E9D96925cDA7697A
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const server = app.listen(5000);
const portNumber = server.address().port;
console.log(`Port is open on ${portNumber}`);
