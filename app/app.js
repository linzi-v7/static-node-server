const express = require("express");
const env = require("dotenv");
const path = require("path");

env.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.get(`/`, (req, res) => res.sendFile(path.join(__dirname, `../views/index.html`)));
app.get(`/home`, (req, res) => res.sendFile(path.join(__dirname, `../views/index.html`)));
app.get(`/contact-us`, (req, res) => res.sendFile(path.join(__dirname, `../views/contact-us.html`)));
app.get(`/about`, (req, res) => res.sendFile(path.join(__dirname, `../views/about.html`)));

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, `../views/404.html`));
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server is listening on port ${PORT}`);
});
