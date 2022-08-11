import React, {useEffects, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Search from './Search/Search.jsx'
import Login from './Login/Login.jsx'
import Database from './Database/Database.jsx'
//import 'bootstrap/dist/css/bootstrap.min.css';
function App () {


  const [login, setLoginStatus] = useState(false);
  const [showDB, setDBVisible] = useState(false);
  const userData = JSON.parse(window.localStorage.LoginDetails || '{}');
  const style = {float: 'left'};
  const textStyle = {display: 'inline-block',
  color: 'white',
  textAlign: 'center',
  padding: '14px 16px',
  textDecoration: 'none'};

  return (
    <>
    <div className="navBar">
    <ul className="navigation" style={{listStyleType: 'none', margin: '0', padding: '0', overflow: 'hidden', backgroundColor: '#333'}}>
      <li style={style}><a style={textStyle} onClick={()=> (login && setDBVisible(false))}>Search</a></li>
      <li style={style}><a onClick={()=> (login && setDBVisible(true))} style={textStyle}>Database</a></li>
      <li style={style}><a style={textStyle}>Updates</a></li>
      <li style={{float: 'right'}}><a style={textStyle}>About</a></li>
    </ul>
    </div>
    {login ? showDB ? <Database/> : <Login/> :

    <div className="Welcome" style={{textAlign: 'center'}}>
        <p>Welcome{userData.userName && ` back, ${userData.userName}`}!</p>
        <Button onClick={() => setLoginStatus(true)}>{ userData.userName ? `Return to Search` : 'Continue to Login/Registration'}</Button>
      </div>}
    {/* {login
    ? <Login/>
    : (
      <div className="Welcome" style={{textAlign: 'center'}}>
        <p>Welcome{userData.userName && ` back, ${userData.userName}`}!</p>
        <Button onClick={() => setLoginStatus(true)}>{ userData.userName ? `Return to Search` : 'Continue to Login/Registration'}</Button>
      </div>
    )} */}

  </>
  )
}
export default App