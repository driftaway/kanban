import React from 'react';
import './Profile.css';
// import { Button } from '@material-ui/core';
import { Avatar, TextField } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './../../firebase';

const Profile = ({ username }) => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <div className='profile'>
      <div className='profile__info'>
        <div style={{ overflow: 'hidden', borderRadius: 15, marginRight: 20 }}>
          <Avatar 
            style={{ borderRadius: 0 }}
            sx={{ width: 70, height: 70, bgcolor: '#879cff' }}
          >
            Av
          </Avatar>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: 6 }}>{username.join(' ')}</h3>
          <span style={{ fontSize: 14, color: '#a0aec0' }}>{user.email}</span>
        </div>
      </div>

      <div className='profile__container'>
        <h3>Basic info</h3>

        <div style={{ display: 'flex', marginTop: 40 }}>
          <div style={{ width: '50%', marginRight: 15 }}>
            <h5 style={{ marginBottom: 5 }}>First name</h5>
            <TextField 
              fullWidth
              // placeholder='Enter email' 
              variant='outlined'
              defaultValue={username[0]}
              // onChange={e => setEmail(e.target.value)} 
              inputProps={{
                form: {
                  autocomplete: 'off',
                },
              }}
            />
          </div>
          
          <div style={{ width: '50%', marginLeft: 15 }}>
            <h5 style={{ marginBottom: 5 }}>Last name</h5>
            <TextField 
              fullWidth
              // placeholder='Enter email' 
              variant='outlined'
              defaultValue={username[1]}
              // onChange={e => setEmail(e.target.value)} 
              inputProps={{
                form: {
                  autocomplete: 'off',
                },
              }}
            />
          </div>
        </div>

        <div style={{ width: 'calc(50% - 15px)', marginTop: 20 }}>
          <h5 style={{ marginBottom: 5 }}>Email</h5>
          <TextField 
            fullWidth
            // placeholder='Enter email' 
            variant='outlined'
            defaultValue={user.email}
            // onChange={e => setEmail(e.target.value)} 
            inputProps={{
              readOnly: true,
              form: {
                autocomplete: 'off',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default Profile;
