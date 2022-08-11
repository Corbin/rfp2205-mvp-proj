require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const compression = require('compression');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(compression());
app.use(express.json());
const db = require('./db.js');

let config = {
  headers: {
    'Authorization': process.env.TWILLIO_AUTH
  }
};
app.use(express.static("dist"));
///A TrueSpam score is returned on a scale from 0-100. Scores from 0-39 indicate a Low score, 40-79 indicates a Medium score, and 80-100 indicates a High score.
app.all('/api/phone', (req, res) => {
  //console.log(req);
  axios.get(`https://lookups.twilio.com/v1/PhoneNumbers/${req.query.phoneNumber}?AddOns=ekata&AddOns=icehook&AddOns=nomorobo_spamscore&AddOns=truespam&AddOns=marchex&AddOns=twilio_carrier_info`, config)
  .then(({status, data}) => {
    res.status(status).send(data);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

app.get('/users', (req, res) => {
  //console.log(req.query)
  db.getUser(req.query)
  .then(({rows}) => res.status(200).json(rows[0]))
  .catch(error => res.status(500).json(error));
  //.then(({rows}) => rows.length > 0 ? res.status(200).json(rows[0]) : res.status(404).send('Product Not Found.'))
  //.catch(error => res.status(500).send('Internal Server Error'));
})

app.post('/phone', (req, res) => {
  //console.log(req.body)
  db.createNumber(req.body)
  .then((result) => (console.log(result), res.status(201).json(result)))
  .catch(error => console.log(error));
  //.then(({rows}) => rows.length > 0 ? res.status(200).json(rows[0]) : res.status(404).send('Product Not Found.'))
  //.catch(error => res.status(500).send('Internal Server Error'));
})

app.get('/phone', (req, res) => {
  db.getNumbers()
  .then(({rows}) => (res.status(200).json(rows[0].results)))
  .catch(error => console.log(error));
  //.then(({rows}) => rows.length > 0 ? res.status(200).json(rows[0]) : res.status(404).send('Product Not Found.'))
  //.catch(error => res.status(500).send('Internal Server Error'));
})

app.post('/users', (req, res) => {
  db.createUser(req.body)
  .then(({rows}) => res.status(201).json(rows[0]))
  .catch(error => error.detail.includes('exists') ? res.status(500).send('User already exists!') : res.status(500).json(error));
  //.then(({rows}) => rows.length > 0 ? res.status(200).json(rows[0]) : res.status(404).send('Product Not Found.'))
  //.catch(error => res.status(500).send('Internal Server Error'));

})

app.listen(port, () => {
  console.log('app listening on:', port);
})