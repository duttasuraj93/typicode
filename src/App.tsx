import React, { lazy, Suspense, useEffect } from 'react';
import Login from './routes/Login';
import Albums from './routes/Albums';
import AlbumDetails from './routes/AlbumDetails';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import { useAppSelector, useAppDispatch } from './hooks'
import Home from './routes/Home';
import {setUser} from './redux/reducers/auth'

const App: React.FC = () => {
  const reduxAuth = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {

    const email = localStorage.getItem('email')
    const password = localStorage.getItem('password')
    console.log(email);
    if(email && password) {
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
          </Routes>
          {/* <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/albums" element={
              <ProtectedRoute>
                <Albums />
              </ProtectedRoute>
            }
            />
            <Route path="/album/:id" element={
              <ProtectedRoute>
                <AlbumDetails />
              </ProtectedRoute>
            }
            />
          </Routes> */}
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
