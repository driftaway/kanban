import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import './Settings.css';
import { auth, db, logout } from './../../firebase';
import { AccountCircle, Notifications, PowerSettingsNew } from '@mui/icons-material';
import { Button } from '@material-ui/core';

const Settings = ({ username, setUsername }) => {
  return (
    <div className='dashboard'>
      Settings data here
    </div>
  );
}
export default Settings;
