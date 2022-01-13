import React, { useRef } from 'react';
import './Profile.css';
// import { Button } from '@material-ui/core';
import { Avatar, Button, TextField } from '@mui/material';
import { auth } from './../../firebase';
import { updateProfile } from "firebase/auth";

const Profile = ({ userInfo, setUserInfo }) => {
  const firstnameRef = useRef(null)
  const lastnameRef = useRef(null)
  const displayNameRef = useRef(null)

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: displayNameRef.current.value
        // photoURL: "https://www.wykop.pl/cdn/c3201142/comment_kjaYQSPCz67trpwv5122vUA3J2xVTpgM.jpg",
      })
      setUserInfo({...userInfo, displayName: displayNameRef.current.value })
    } catch (err) {
      console.log(err)
    }
  }
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
          <h3 style={{ marginBottom: 6 }}>{userInfo.displayName || 'Set your username'}</h3>
          <span style={{ fontSize: 14, color: '#a0aec0' }}>{userInfo.email}</span>
        </div>
      </div>

      <div className='profile__container'>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Basic info</h3>

          <Button onClick={handleUpdateProfile}>
            Save profile
          </Button>
        </div>

        <div style={{ display: 'flex', marginTop: 40 }}>
          <div style={{ width: '50%', marginRight: 15 }}>
            <h5 style={{ marginBottom: 5 }}>Email</h5>
            <TextField 
              fullWidth
              // placeholder='Enter email' 
              variant='outlined'
              defaultValue={userInfo.email}
              // onChange={e => setEmail(e.target.value)} 
              inputProps={{
                readOnly: true,
                form: {
                  autocomplete: 'off',
                },
              }}
            />
          </div>

          <div style={{ width: '50%', marginLeft: 15 }}>
            <h5 style={{ marginBottom: 5 }}>Username</h5>
            <TextField 
              fullWidth
              placeholder='Enter username' 
              variant='outlined'
              inputRef={displayNameRef}
              defaultValue={userInfo.displayName || ''}
              // onChange={e => setEmail(e.target.value)} 
              inputProps={{
                form: {
                  autocomplete: 'off',
                },
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', marginTop: 20 }}>
          <div style={{ width: '50%', marginRight: 15 }}>
            <h5 style={{ marginBottom: 5 }}>First name</h5>
            <TextField 
              fullWidth
              inputRef={firstnameRef}
              placeholder='Enter first name' 
              variant='outlined'
              // defaultValue={username[0]}
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
              inputRef={lastnameRef}
              placeholder='Enter last name' 
              variant='outlined'
              // defaultValue={username[1]}
              // onChange={e => setEmail(e.target.value)} 
              inputProps={{
                form: {
                  autocomplete: 'off',
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
