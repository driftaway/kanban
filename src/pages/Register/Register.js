import { Button } from '@material-ui/core';
import { CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth, registerWithEmailAndPassword } from './../../firebase';
import './Register.css';

const Register = ({ setToastMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  const creteNewUser = async () => {
    setLoading(true)
    try {
      const response = await registerWithEmailAndPassword(email, password);

      if (response[0] === 'error') {
        setToastMessage(response)
        setPassword('')
        setEmail('')
        setLoading(false)
        return false
      }

    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    creteNewUser()    
  }

  useEffect(() => {
    if (loading) return;
    if (user) navigate('/dashboard')
  }, [user, loading]);

  return (
    <div className='register'>
      <div className='register__wrapper'>
        <form 
          onSubmit={handleSubmit}
          className='register__container'
        >
          <h2>Register</h2>

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
          
          <Button type='submit' className='register__btn' fullWidth>
            {isLoading ? <CircularProgress style={{ fontSize: 20, color: '#fff', width: 24, height: 24 }} /> : 'Register'}
          </Button>

          <div style={{ fontSize: 16, color: '#bababa' }}>
            Already have an account? <Link style={{ color: '#fff' }} to='/login'>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Register;