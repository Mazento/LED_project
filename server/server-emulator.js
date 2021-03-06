const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4321;

app
  .use(cors())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .all('/', r => r.res.send('No command'))
  .get('/api/main/status', (req, res) => {
    console.log(`get /main/status ${req.body}`);
    res.setHeader('Content-Type', 'application/json');
    gpios = {
      "gpio1": 1,
      "gpio2": 1,
      "gpio3": 0,
      "gpio4": 1,
      "gpio5": 1,
      "gpio6": 0,
      "gpio7": 0,
      "gpio8": 1,
    }
    res.send(JSON.stringify(gpios));
  })
  .post('/api/main', (req, res) => {
    console.log(req.url);
    const arr = req.body;
    console.log(arr);
    // Emulate lag
    // setTimeout(() => res.send(JSON.stringify(resArr)), 3000);
    res.send(JSON.stringify(arr));
  })
  .get('/api/ambi', (req, res) => {
    console.log(`get /main/status ${req.body}`);
    res.setHeader('Content-Type', 'application/json');
    const ambi = {
      type: 'solid',
      color: {
        r: 255,
        g: 0,
        b: 255,
      },      
    }
    res.send(JSON.stringify(ambi));
  })
  .post('/api/ambi', (req, res) => {
    resAmbi = {}
    resAmbi.type = req.body.type;
    const colors = {
      r: req.body.color.r,
      g: req.body.color.g,
      b: req.body.color.b,
    };
    resAmbi.color = colors;
    console.log(resAmbi);
    res.send(JSON.stringify(resAmbi));
  })
  .listen(process.env.PORT || PORT, () => console.log('Ok!'))
