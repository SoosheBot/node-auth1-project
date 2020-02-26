import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Register = props => {
  console.log(props);
    const [reg, setReg] = useState({
        username: '',
        password: ''
    });

    const handleChanges = e => {
        setReg({
            ...reg,
            [e.target.name]: e.target.value
            }
        )
        // console.log('handlechange is firing')
    };

    const onSubmit = e => {
        e.preventDefault();
        console.log('thereg', reg)
        return axiosWithAuth()
        // any call that is going to need a response after a post* -- you have to do 'return' axiosWithAuth() -- *only post
        .post( '/api/auth/register', reg)
          // console.log('onsubmit is firing')
        .then(res => {
            console.log('props', props)
            localStorage.setItem('token', res.data.token);
            props.history.push('/login');
            return true
        })
            .catch(err => console.log(err.response));
    }

  return (
      <form className="sign-up-form" onSubmit={onSubmit}>
        <label htmlFor="first-name">Username (must be 8 or more characters): </label>
        <input type="text" name='username' placeholder="JohnDoe123..." username={reg.username} onChange={handleChanges} required/>
        <br />
        <label htmlFor="password">Password (must be 8 or more characters): </label>
        <input type="text" name='password' placeholder="12345678..." password={reg.password} onChange={handleChanges} required="Password must be 8 characters!"/>
        <br />

        <button type="submit">Sign Up</button>
        {/* <p>
          Aleady have an account? <br />
          <Link to='/login'>Log in here</Link>{" "}
        </p> */}
      </form>
  );
};

export default Register;