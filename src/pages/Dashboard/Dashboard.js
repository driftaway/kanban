import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import './Dashboard.css';
import { auth, db, logout } from './../../firebase';
import Settings from '@mui/icons-material/Settings';
import { AccountCircle, Notifications, PowerSettingsNew } from '@mui/icons-material';
import { Button } from '@material-ui/core';
import TopBar from '../TopBar/TopBar';

const Dashboard = ({ username, setUsername }) => {
  return (
    <div className='dashboard'>
      {/* <TopBar username={username} /> */}
      Dashboard here
    </div>
  );
}
export default Dashboard;
