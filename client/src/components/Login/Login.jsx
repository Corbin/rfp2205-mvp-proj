import React, {useEffects, useState} from 'react';
import Search from '../Search/Search.jsx'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import md5 from 'md5';
function Login () {
  const [login, setLoginStatus] = useState(false);
  const [loginSuccess, setSuccessStatus] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [previouslyLoggedIn, setPersistence] = useState(false);
  let userData;
  if (window.localStorage.LoginDetails && !previouslyLoggedIn) {
    userData = JSON.parse(localStorage.getItem('LoginDetails'));
    if (userData.hash = md5(username + 'success')) {
      if((((Date.now() - userData.lastLogin) / 1000 / 60 / 60) <= 24)) {
        setSuccessStatus(true);
      } else {
        setLoginMessage('Your session has expired, please login again!');
      }
    }
    setPersistence(true);
    // console.log(loginSuccess, md5(username + 'success'), userData.hash )
  }
  var handleClick = (e) => {
    e.target.name === 'register'
    ? axios.post('/users', { username, password })
        .then(({data}) => data.userExists && (setLoginMessage('Registered!'), setSuccessStatus(data.userExists), localStorage.setItem('LoginDetails', JSON.stringify({userName: username, lastLogin: Date.now(), hash: md5(username + 'success')}))))
        .catch(({data}) => data.includes('exists') && setLoginMessage('Username Already Exists!, Please Try again'))
    : axios.get('/users', { params : { username, password } })
      .then(({data}) => data.userExists
      ? (setLoginMessage('Logged In!'), setSuccessStatus(data.userExists), localStorage.setItem('LoginDetails', JSON.stringify({userName: username, lastLogin: Date.now(), hash: md5(username + 'success')})))
      : setLoginMessage('Please check your login details.'))
      .catch((err) => console.log(err) );
      // console.log(loginMessage)

  }
  userData = JSON.parse(localStorage.getItem('LoginDetails'));
  return (
    loginSuccess
    ? ( <Search username={userData.userName}/> )
    : (
        <div className="Login" style={{display: 'flex',flexDirection: 'column',alignContent: 'center',justifyContent: 'center',alignItems: 'center'}}>
          Please Register/Login to Search!
          <p>{loginMessage}</p>
          <input type="text" name="username" required onChange={(e) => setUsername(e.target.value)}></input>
          <input type="password" name="username" required onChange={(e) => setPassword(md5(e.target.value))}></input>
          <Button name="register" onClick={(e) => handleClick(e)}>Register</Button>
          <Button name="login" onClick={(e) => handleClick(e)}>Login</Button>
        </div>
    )
  )
}
export default Login;