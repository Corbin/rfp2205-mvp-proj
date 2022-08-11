require('dotenv').config();
const md5 = require('md5');
const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOSTNAME,
  database: process.env.DB_NAME,
  // password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
})

const getNumbers = () => pool.query(`SELECT json_agg(row_to_json(phonedata)) results FROM phonedata`);


const createNumber = (data) => {
  const Number = data.national_format;
  const LineType = data.line_type;
  const Country = data.country_name;
  const Carrier = data.carrier;
  const RiskFactor = data.risk_factor;
  const Username = data.username;
  return pool.query(`INSERT INTO phonedata( phonenumber, linetype, country, carrier, risk, userid ) VALUES ($1, $2, $3, $4, $5, (SELECT id FROM users WHERE users.username=$6))
  ON CONFLICT (phonenumber)
  DO
  UPDATE SET linetype=$2, country=$3, carrier=$4, risk=$5, userid=(SELECT id FROM users WHERE users.username=$6)
  `, [Number, LineType, Country, Carrier, RiskFactor, Username]);
  // .then(({rows}) => rows.length > 0 ? res.status(200).json(rows[0]) : res.status(404).send('Product Not Found.'))
  // .catch(error => res.status(500).send('Internal Server Error'));
}

const createUser = (data) => {
  // console.log('DATA',data)
  const username = data.username;
  const password = data.password;
  return pool.query(`INSERT INTO users( username, password ) VALUES ($1, $2)`, [username, password])
  .then(() => getUser(data));
  // .then(({rows}) => res.status(200).json('usercreated successfully'))
  // .catch(error => res.status(500).send('Internal Server Error'));
}

const getUser = (data) => {
  //console.log(data, 'password', data.password)
  const username = data.username;
  const password = data.password;
  return pool.query(`SELECT EXISTS(SELECT username, password FROM users WHERE username = $1 AND password = $2) as "userExists"`, [username, password]);
}

module.exports = {
  getNumbers,
  createNumber,
  createUser,
  getUser
}
