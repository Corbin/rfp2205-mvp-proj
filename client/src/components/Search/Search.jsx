import React, {useState, useEffects} from 'react';
const spamScore = require('../../../../helperFunc/functions.js').getRiskFactor
import axios from 'axios';
import {LowRisk, MediumRisk, HighRisk} from '../styles/globalStyles.js';

function Search ({username}) {
const [searchQuery, setPhoneNumber] = useState('');
const [results, setPhoneData] = useState(undefined);
const [doneSearching, setSearching] = useState(false);
const [isLoading, setLoading] = useState(false);
// console.log('USERNAME', username)

  if (results) {
    var {national_format} = results;
    var data = results.add_ons.results;
    var { line_type } = data.ekata.result;
    var { carrier } = data.ekata.result;
    var { country_name } = data.ekata.result;
    var risk_factor = data.icehook.result.risk_level;
    // console.log('hi', {national_format, line_type, country_name, carrier, risk_factor, username})

  }

  var handleClick = function () {
    let resultsS;
    setSearching(false);
    setLoading(true);
    // this.setState({searchFinished: false, isLoading: true});
    axios.get('http://localhost:3000/api/phone', { params : {phoneNumber: searchQuery}})
    .then(response => {
      // console.log(response.data)
      setPhoneData(response.data);
      var {national_format} = response.data;
      var data = response.data.add_ons.results;
      var { line_type } = data.ekata.result;
      var { carrier } = data.ekata.result;
      var { country_name } = data.ekata.result;
      var risk_factor = data.icehook.result.risk_level;
      axios.post('/phone', {national_format, line_type, country_name, carrier, risk_factor, username})
      .catch(error => console.log(error))
      setLoading(false);
      setSearching(true);
    })
    .catch(error => console.log(error));
  }



  return (
    <div className="search" style={{display: 'flex',flexDirection: 'column',alignContent: 'center',justifyContent: 'center',alignItems: 'center'}}>
            <label>Plase enter your search query</label>
            <input type="phone" name="phone" onChange={(e) => setPhoneNumber(e.target.value)} required></input>
            <button onClick={handleClick}>search</button>
            {doneSearching && results !== undefined ? (
              <div className="results">
                <p>Number: {national_format}</p>
                <p>Line Type: {line_type}</p>
                <p>Country: {country_name}</p>
                <p>Carrier: {carrier}</p>
                <p style={{display: 'flex', flexDirection: 'row'}}>Risk Factor: { risk_factor >= 0 && risk_factor <= 39 ? <LowRisk>{spamScore(risk_factor)}</LowRisk> : risk_factor > 39 && risk_factor <= 79 ? <MediumRisk>{spamScore(risk_factor)}</MediumRisk> : risk_factor > 79 && <HighRisk>{spamScore(risk_factor)}</HighRisk>}</p>
              </div>
            ) : isLoading ? (
            <div className="results">
              Loading...
            </div>) : (
            <div className="results">
            </div>
            )}

      </div>
  )

}
export default Search;