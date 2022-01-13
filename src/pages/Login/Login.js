import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from './../../firebase.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import './Login.css';
import { Button, TextField } from '@material-ui/core';
import { CircularProgress } from '@mui/material';

const Login = ({ setToastMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)
    const response = await signInWithEmailAndPassword(email, password)
    setToastMessage(response)
    setLoading(false)
    if (response[0] === 'error') {
      setPassword('')
      setEmail('')
      return false
    }

    navigate('/dashboard');
  }

  return (
    <div className='login'>
      <div className='login__wrapper'>
        <form 
          onSubmit={event => handleSubmit(event)}
          className='login__container'
        >
          <h2>Sign In</h2>

          <div style={{ width: '100%', marginTop: 20 }}>
            <h5 style={{ margin: '8px 0' }}>Email</h5>
            <TextField 
              fullWidth
              placeholder='Enter email' 
              variant='outlined'
              value={email}
              onChange={e => setEmail(e.target.value)} 
              inputProps={{
                form: {
                  autocomplete: 'off',
                },
              }}
            />
          </div>

          <div style={{ width: '100%', marginTop: 20 }}>
            <h5 style={{ margin: '8px 0' }}>Password</h5>
            
            <TextField 
              fullWidth
              type='password'
              placeholder='Enter password' 
              variant='outlined' 
              value={password}
              onChange={e => setPassword(e.target.value)} 
              
          />
          </div>
          
          <Button
            className='login__btn'
            fullWidth
            type='submit'
          >
            {isLoading ? <CircularProgress style={{ fontSize: 20, color: '#fff', width: 24, height: 24 }} /> : 'Sign in'}
          </Button>

          <div style={{ fontSize: 16, color: '#bababa' }}>
            Don't have an account? <Link style={{ color: '#fff' }} to='/register'>Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
