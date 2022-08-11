import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
const spamScore = require('../../../../helperFunc/functions.js').getRiskFactor;
import {LowRisk, MediumRisk, HighRisk} from '../styles/globalStyles.js';
//import 'bootstrap/dist/css/bootstrap.min.css';
function Database () {

  const [data, setNumbersData] = useState(undefined);

  useEffect( () => {
    axios.get('/phone')
    .then(({data}) => setNumbersData(data))
    .catch(error => console.log(error))
  },[data])

  return (
    // data && (
    //   <div className="Database">

    // </div>
    // )
    data && (
  <div className="Database">
    <table>
    <thead>
      <tr>
        <th>Phone Number</th>
        <th>Line Type</th>
        <th>Country</th>
        <th>Carrier</th>
        <th>Risk Factor</th>
      </tr>
      </thead>
      <tbody>
      {data.map(number =>
        <tr>
          <td>{number.phonenumber}</td>
          <td>{number.linetype}</td>
          <td>{number.country}</td>
          <td>{number.carrier ? number.carrier : 'Unknown'}</td>
          <td>{number.risk >= 0 && number.risk <= 39 ? <LowRisk>{spamScore(number.risk)}</LowRisk> : number.risk > 39 && number.risk <= 79 ? <MediumRisk>{spamScore(number.risk)}</MediumRisk> : number.risk > 79 && <HighRisk>{spamScore(number.risk)}</HighRisk>}</td>
        </tr>
        )
      }
      </tbody>
    </table>
  </div>
  ))
}
export default Database;