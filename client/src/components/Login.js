import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';
// import { Link } from 'react-router-dom';


const Login = props => {
  console.log(props);
  const [login, setLogin] = useState({
    username: '',
    password: ''
  });

  const handleChanges = e => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    }
    )
    // console.log('handlechange login is firing')
  };

  const onSubmit = e => {
    e.preventDefault();
    return axiosWithAuth()
    .post('/api/auth/login', login)
    // console.log('login is firing')
    .then(res => {
        // console.log(res)
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userid', res.data.id);
        props.history.push('/userlist');
    })
        .catch(err => console.log('login error', err.response));
  }



  return (
      <form className="login-form" onSubmit={onSubmit}>
        <label htmlFor="username">Enter Username (must match your registered username): </label>
        <input type="text" name='username' placeholder="JohnDoe123..." username={login.username} onChange={handleChanges} required /><br />
        <label htmlFor="email">Password (must match your registered password): </label>
        <input type="text" name='password' placeholder="12345678..." password={login.password} onChange={handleChanges} required /><br />
        <button type="submit">Login</button>
        {/* <p>
          Need to sign up? <br />
          <Link to='/'>Sign Up Now!</Link>
        </p> */}
      </form>

  );
};



export default Login;