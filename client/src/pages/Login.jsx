import React, { useState } from 'react';
import LoginForm from '../components/LoginForm'
import { instance } from '../axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../store/slices/user'
import jwtDecode from 'jwt-decode'
import { LOGIN_POST, MAIN_PAGE } from '../constants'

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const handleLogin = async () => {
    try {
      const response = await instance.post(LOGIN_POST, {email: email, password: password})
      const token = response.data.token
      const decode = jwtDecode(token)
      dispatch(login({
        email: decode.email,
        token: token,
        isAuth: true
      }))
      localStorage.setItem('token', response.data.token)
      navigate(MAIN_PAGE)
    } catch (error) {
      console.error(error)
      if (error.response.data.error) {
        setErrors(error.response.data.error)
        setShowAlert(true)
        setEmail('')
        setPassword('')
      } else {
        setErrors('Произошла ошибка')
      }
    }
  }

  return (
    <LoginForm
      handleLogin={handleLogin}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      showAlert={showAlert}
      setShowAlert={setShowAlert}
      errors={errors}
    />
  );
};

export default Login;