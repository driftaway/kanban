import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import './Settings.css';
import { auth, db, logout } from './../../firebase';
import { AccountCircle, Delete, Notifications, PowerSettingsNew } from '@mui/icons-material';
import { Button } from '@material-ui/core';
import { getAuth, deleteUser } from "firebase/auth";
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Settings = ({ username, setUsername }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate

  const handleDeleteUser = async () => {
    try {
      await deleteUser(user)
      navigate('/login')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='dashboard'>
      Settings data here
      <IconButton onClick={handleDeleteUser}>
        <Delete />
      </IconButton>
    </div>
  );
}
export default Settings;
