import React, { lazy, Suspense, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import { useAppSelector, useAppDispatch } from './hooks'
import { setUser } from './redux/reducers/auth'

const Login = lazy(() => import('./routes/Login'));
const Home = lazy(() => import('./routes/Home'));
const Albums = lazy(() => import('./routes/Albums'));
const AlbumDetails = lazy(() => import('./routes/AlbumDetails'));

const App: React.FC = () => {
  const reduxAuth = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {

    const email = localStorage.getItem('email')
    const password = localStorage.getItem('password')
    console.log(email);
    if (email && password) {
      let data = {
        email: email,
        password: password,
        isLoggedIn: true
      }
      dispatch(setUser(data))
    }

  }, [])



  return (
    <div className="App">
      <Router>
        <Suspense fallback={`Loading`}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={reduxAuth.isLoggedIn ? <Navigate to="/" /> : <Login />} />
            {/* Protected Routes starts from here */}
            <Route element={<ProtectedRoute auth={reduxAuth.isLoggedIn} />}>
              <Route path='/albums' element={<Albums />} />
              <Route path='/album/:id' element={<AlbumDetails />} />
            </Route>
            {/* Fallback route */}
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
