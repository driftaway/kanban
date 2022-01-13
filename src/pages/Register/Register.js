import { Button } from '@material-ui/core';
import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth, registerWithEmailAndPassword } from './../../firebase';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert('Please enter name');
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate('/dashboard')
  }, [user, loading]);

  return (
    <div className='register'>
      <div className='register__wrapper'>
        <form 
          onSubmit={event => {
            event.preventDefault()
            register()
          }}
          className='register__container'
        >
          <h1>Sign Up</h1>

          <div style={{ width: '100%' }}>
            <h4 style={{ margin: '10px 0' }}>Full name</h4>
            <TextField 
              fullWidth
              placeholder='Enter full name' 
              variant='outlined'
              value={name}
              onChange={e => setName(e.target.value)} 
              inputProps={{
                form: {
                  autocomplete: 'off',
                },
              }}
            />
          </div>

          <div style={{ width: '100%', marginTop: 30 }}>
            <h4 style={{ margin: '10px 0' }}>Email</h4>
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

          <div style={{ width: '100%', marginTop: 30 }}>
            <h4 style={{ margin: '10px 0' }}>Password</h4>
            
            <TextField 
              fullWidth
              type='password'
              placeholder='Enter password' 
              variant='outlined' 
              value={password}
              onChange={e => setPassword(e.target.value)} 
              
          />
          </div>
          
          <Button className='register__btn' fullWidth>Register</Button>

          <div style={{ fontSize: 22, color: '#bababa' }}>
            Already have an account? <Link style={{ color: '#fff' }} to='/'>Login</Link> now.
          </div>
        </form>
      </div>
    </div>
  );
}
export default Register;