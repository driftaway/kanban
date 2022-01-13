import { Alert, Snackbar } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import TopBar from './pages/TopBar';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';

const App = () => {
  const [toastMessage, setToastMessage] = useState(undefined)
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState([])
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/')
    if (user && userInfo.length === 0) setUserInfo(user.providerData[0])
  }, [user, loading, userInfo]);

  return (
    <>
      {toastMessage &&
        <Snackbar 
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={4000}
          onClose={() => setToastMessage(false)}
          open={toastMessage !== undefined}>
          <Alert
            elevation={6} 
            variant='filled'
            severity={toastMessage[0]}
          >
            {toastMessage[1]}
          </Alert>
        </Snackbar>}

        {user && <TopBar displayName={user.displayName} />}

      <Routes>
        {user && userInfo.length !== 0 && 
          <>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/profile' element={<Profile setUserInfo={setUserInfo} userInfo={userInfo} />} />
            <Route path='/settings' element={<Settings user={user.displayName} />} />
            <Route path='/notifications' element={<Notifications user={user} />} />
          </>}
        <Route path='/register' element={<Register setToastMessage={setToastMessage} />} />
        <Route path='/' element={<Login setToastMessage={setToastMessage} />} />
      </Routes>
    </>
  );
}

export default App;
