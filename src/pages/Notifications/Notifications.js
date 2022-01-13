import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import './Notifications.css';
import { auth, db, logout } from './../../firebase';
import { Button } from '@material-ui/core';

const Notifications = ({ username, setUsername }) => {
  return (
    <div className='dashboard'>
      Notifications data here
    </div>
  );
}
export default Notifications;
