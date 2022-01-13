import { Alert, Snackbar } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import TopBar from './pages/TopBar';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';

const App = () => {
  const [toastMessage, setToastMessage] = useState(undefined)
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  const fetchUserName = async () => {
    try {
      const query = await db
        .collection('users')
        .where('uid', '==', user?.uid)
        .get();

      const data = await query.docs[0].data();
      console.log(123, data)
      setUsername([data.firstname, data.lastname])
    } catch (err) {
      console.error(err);
      alert('An error occured while fetching user data');
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/')
    fetchUserName();
  }, [user, loading]);

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

        {user && username && <TopBar username={username} />}

      <Routes>
        <Route path='/' element={<Login setToastMessage={setToastMessage} />} />
        <Route path='/register' element={<Register />} />
        {user && username &&
          <>
            <Route path='/dashboard' element={<Dashboard username={username} setUsername={setUsername} />} />
            <Route path='/profile' element={<Profile username={username} user={user} />} />
            <Route path='/settings' element={<Settings username={username} setUsername={setUsername} />} />
            <Route path='/notifications' element={<Notifications username={username} setUsername={setUsername} />} />
          </>
        }
      </Routes>
    </>
  );
}

export default App;
