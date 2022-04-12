import React, { useState } from 'react'
import { useAppDispatch } from '../../hooks'
import { setUser } from '../../redux/reducers/auth'


const Login: React.FC = () => {

  const dispatch = useAppDispatch()
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const submitForm = () => {

    var emailTest = /\S+@\S+\.\S+/;
    var passwordTest = /[0-9a-zA-Z]{8,}$/;

    if (emailTest && passwordTest) {
      let data = {
        email: email,
        password: password,
        isLoggedIn: true
      }
      dispatch(setUser(data))
      localStorage.setItem('email', email)
      localStorage.setItem('password', password)
    }


  }

  return (
    <div>
      <h1>Login</h1>
      <div>
        <input required type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input required type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={submitForm} type="submit">Submit</button>
      </div>
    </div>
  )
}

export default Login;