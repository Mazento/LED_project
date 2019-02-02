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
  .post('/api/main/*', (req, res) => {
    let arr = []
    let resArr = {}
    console.log(req.url);
    if(req.url == "/api/main/on") {
      arr = req.body;
      arr.forEach(x => { resArr[x] = 1 });
    }
    else if(req.url == "/api/main/off") {
      arr = req.body;
      arr.forEach(x => { resArr[x] = 0 });
    }
    console.log(resArr);
    // Emulate lag
    // setTimeout(() => res.send(JSON.stringify(resArr)), 3000);
    res.send(JSON.stringify(resArr));
  })
  .post('/api/ambi/all', (req, res) => {
    console.log(req.body);
    res.send('ok');
  })
  .listen(process.env.PORT || PORT, () => console.log('Ok!'))
