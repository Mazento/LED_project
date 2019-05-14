const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');

const port = 80;
const HTML_FILE = path.join(__dirname, 'index.html')

app.use(express.static(__dirname))
app.get('*', (req, res) => {
  res.sendFile(HTML_FILE)
})
server.listen(port, error => {
  if (error) throw error;
  console.log(`Listening on port ${port}`);
});