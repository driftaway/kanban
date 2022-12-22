import React from 'react';
import './TopBar.css';
import { logout } from './../../firebase';
import Settings from '@mui/icons-material/Settings';
import { AccountCircle, Dashboard, Notifications, PowerSettingsNew } from '@mui/icons-material';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const TopBar = ({ displayName }) => {
  const navigate = useNavigate()

  return (
    <div className='topbar'>
      <header className='topbar__container'>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Dashboard onClick={() => navigate('/dashboard')} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button onClick={() => navigate('/profile')} disableRipple variant='outlined' startIcon={<AccountCircle style={{ fontSize: 18 }} />}>
            {displayName || 'Set your username'}
          </Button>
          
          <Notifications onClick={() => navigate('/notifications')} />
          <Settings onClick={() => navigate('/settings')} />

          <PowerSettingsNew 
            onClick={() => {
              logout()
              navigate('/login')
            }} 
          />
        </div>
      </header>
    </div>
  );
}
export default TopBar;
